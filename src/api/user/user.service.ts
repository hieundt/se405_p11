import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { CreateUserDto, ForgotPasswordDto, SignInDto, UpdateUserDto } from './dto/user.dto';
import {
  ConfirmPasswordDoesNotMatchException,
  EmailAlreadyExistsException,
  EmailDoesNotExistsException,
  PasswordDoesNotMatchException,
  SchemaNotFoundException,
} from 'src/common/error';
import { User } from './schema/user.schema';
import { EmailVerification } from './schema/emailVerification.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(EmailVerification.name) private readonly emailVerificationModel: Model<EmailVerification>,
    private configService: ConfigService,
  ) {}

  async signIn(dto: SignInDto): Promise<any> {
    const existUser = await this.userModel.findOne({ email: dto.email }).exec();
    if (!existUser) {
      throw new EmailDoesNotExistsException(dto.email);
    }

    const isMatch = await argon2.verify(existUser.password, dto.password);
    if (!isMatch) {
      throw new PasswordDoesNotMatchException();
    }
    return existUser;
  }

  async signUp(dto: CreateUserDto): Promise<User> {
    const existUser = await this.userModel.findOne({ email: dto.email }).exec();
    if (existUser) {
      throw new EmailAlreadyExistsException(dto.email);
    }
    const passwordHash = await argon2.hash(dto.password);

    const newUser = new this.userModel({ ...dto, password: passwordHash });
    return newUser.save();
  }

  //TODO: Read me
  // Method nay tim user theo email, neu tim thay thi update password moi
  // Han che su dung method nay
  async forgotPassword(dto: ForgotPasswordDto): Promise<boolean> {
    const existUser = await this.userModel.findOne({ email: dto.email }).exec();
    if (existUser) {
      if (dto.newPassword !== dto.confirmNewPassword) {
        throw new ConfirmPasswordDoesNotMatchException();
      } else {
        await this.userModel
          .findByIdAndUpdate(
            existUser._id,
            {
              password: await argon2.hash(dto.newPassword),
            },
            { new: true },
          )
          .exec();
        return true;
      }
    }
    throw new EmailAlreadyExistsException(dto.email);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    const existUser = await this.userModel.findById(id).exec();

    if (!existUser) {
      throw new SchemaNotFoundException(User.name, id);
    }

    const updateUser: UpdateUserDto = {
      email: dto.email ?? existUser.email,
      username: dto.username ?? existUser.username,
      avatar: dto.avatar ?? existUser.avatar,
      bio: dto.bio ?? existUser.bio,
    };

    return await this.userModel.findByIdAndUpdate(id, updateUser, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<boolean> {
    const deleteUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleteUser) {
      throw new SchemaNotFoundException(User.name, id);
    }
    return true;
  }

  //VERIFY EMAIL
  async createEmailToken(email: string): Promise<boolean> {
    const emailVerification = await this.emailVerificationModel.findOne({ email: email });
    if (emailVerification && (new Date().getTime() - emailVerification.createdAt.getTime()) / 60000 < 15) {
      throw new HttpException('LOGIN.EMAIL_SENT_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      await this.emailVerificationModel.findOneAndUpdate(
        { email: email },
        {
          email: email,
          emailToken: (Math.floor(Math.random() * 9000000) + 1000000).toString(), //Generate 7 digits number
          timestamp: new Date(),
        },
        { upsert: true },
      );
      return true;
    }
  }

  async verifyEmail(token: string): Promise<boolean> {
    const emailVerif = await this.emailVerificationModel.findOne({ emailToken: token });
    if (emailVerif && emailVerif.email) {
      const existUser = await this.userModel.findOne({ email: emailVerif.email }).exec();
      if (existUser) {
        existUser.isVerify = true;
        const savedUser = await existUser.save();
        await emailVerif.deleteOne();
        return !!savedUser;
      }
    } else {
      throw new HttpException('LOGIN.EMAIL_CODE_NOT_VALID', HttpStatus.FORBIDDEN);
    }
  }

  private email_host = this.configService.get('email.email_host');
  private email_port = this.configService.get('email.email_port');
  private email_user = this.configService.get('email.email_user');
  private email_pass = this.configService.get('email.email_pass');

  async sendEmailVerification(email: string): Promise<boolean> {
    const emailVerif = await this.emailVerificationModel.findOne({ email: email });

    if (emailVerif && emailVerif.emailToken) {
      const transporter = nodemailer.createTransport({
        host: this.email_host,
        port: this.email_port,
        secure: this.email_port === 465, // true for 465, false for other ports
        auth: {
          user: this.email_user,
          pass: this.email_pass,
        },
      });

      const mailOptions = {
        from: '"Food Share" <' + this.email_user + '>',
        to: email, // list of receivers (separated by ,)
        subject: 'Verify Email',
        text: 'Verify Email',
        html:
          'Hi! <br><br> Thanks for your registration<br><br>' +
          '<a href=' +
          'config.host.url' +
          ':' +
          this.email_port +
          '/auth/email/verify/' +
          emailVerif.emailToken +
          '>Click here to activate your account</a>',
      };

      const sent = await new Promise<boolean>(async function (resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log('Message sent: %s', error);
            return reject(false);
          }
          console.log('Message sent: %s', info.messageId);
          resolve(true);
        });
      });

      return sent;
    } else {
      throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
    }
  }
}

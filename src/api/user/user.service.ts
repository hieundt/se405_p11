import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { CreateUserDto, SignInDto, UpdateUserDto } from './dto/user.dto';
import {
  EmailAlreadyExistsException,
  EmailDoesNotExistsException,
  PasswordDoesNotMatchException,
  SchemaNotFoundException,
} from 'src/common/error';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
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
    const existEmail = await this.userModel.findOne({ email: dto.email }).exec();
    if (existEmail) {
      throw new EmailAlreadyExistsException(dto.email);
    }
    const passwordHash = await argon2.hash(dto.password);

    const newUser = new this.userModel({ ...dto, password: passwordHash });
    return newUser.save();
  }

  // async forgotPassword(dto: ForgotPasswordDto): Promise<void> {

  // }

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

    return this.userModel.findByIdAndUpdate(id, updateUser, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<boolean> {
    const deleteUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleteUser) {
      throw new SchemaNotFoundException(User.name, id);
    }
    return true;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign_up.dto';
import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserAccount } from './schema/user_account.schema';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectModel(UserAccount.name)
    private readonly userAccountModel: Model<UserAccount>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<UserAccount> {
    const { email, password } = signUpDto;

    const existEmail = await this.userAccountModel.findOne({ email }).exec();
    if (existEmail) {
      throw new BadRequestException('Email already exists');
    }
    const passwordHash = await argon2.hash(password);

    const userAcount = new this.userAccountModel({
      email,
      passwordHash,
      username: 'test',
    });
    return userAcount.save();
  }

  async signIn(signUpDto: SignUpDto): Promise<UserAccount> {
    const { email, password } = signUpDto;

    const existUser = await this.userAccountModel.findOne({ email }).exec();
    if (!existUser) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await argon2.verify(existUser.passwordHash, password);
    if (!isMatch) {
      throw new BadRequestException('Password is not match');
    }

    return existUser;
  }

  async findAll(): Promise<UserAccount[]> {
    return this.userAccountModel.find().exec();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, dto: UpdateUserAccountDto) {
    return `This action updates a #${id} userAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAccount`;
  }
}

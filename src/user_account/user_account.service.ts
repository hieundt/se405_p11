import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign_up.dto';
import { UpdateUserAccountDto } from './dto/update_user_account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserAccount } from './schema/user_account.schema';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { SignInDto } from './dto/sign_in.dto';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectModel(UserAccount.name)
    private readonly userAccountModel: Model<UserAccount>,
  ) {}

  async signUp(dto: SignUpDto): Promise<UserAccount> {
    const { email, password } = dto;

    const existEmail = await this.userAccountModel.findOne({ email }).exec();
    if (existEmail) {
      throw new BadRequestException('Email already exists');
    }
    const passwordHash = await argon2.hash(password);

    const userAcount = new this.userAccountModel({
      email,
      passwordHash,
    });
    return userAcount.save();
  }

  async signIn(dto: SignInDto): Promise<UserAccount> {
    const { email, password } = dto;

    const existUser = await this.userAccountModel.findOne({ email }).exec();
    if (!existUser) {
      throw new NotFoundException(`User #${email} not found`);
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

  updateAccount(id: string, dto: UpdateUserAccountDto): Promise<UserAccount> {
    const existUser = this.userAccountModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!existUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existUser.exec();
  }

  removeAccount(id: string) {
    const deleteUser = this.userAccountModel.findByIdAndDelete(id);
    if (!deleteUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return deleteUser.exec();
  }
}

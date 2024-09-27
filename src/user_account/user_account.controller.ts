import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserAccountService } from './user_account.service';

import { UpdateUserAccountDto } from './dto/update_user_account.dto';
import { SignUpDto } from './dto/sign_up.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign_in.dto';

@ApiTags('UserAcount')
@Controller('useraccount')
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.userAccountService.signUp(dto);
  }

  @Post('signin')
  signIn(@Body() dto: SignInDto) {
    return this.userAccountService.signIn(dto);
  }

  @Get()
  findAll() {
    return this.userAccountService.findAll();
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() dto: UpdateUserAccountDto) {
    return this.userAccountService.updateAccount(_id, dto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.userAccountService.removeAccount(_id);
  }
}

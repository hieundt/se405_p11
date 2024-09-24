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

import { UpdateUserAccountDto } from './dto/update-user_account.dto';
import { SignUpDto } from './dto/sign_up.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('UserAcount')
@Controller('useraccount')
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.userAccountService.signUp(signUpDto);
  }

  @Post('signin')
  signIn(@Body() signUpDto: SignUpDto) {
    return this.userAccountService.signIn(signUpDto);
  }

  @Get()
  findAll() {
    return this.userAccountService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserAccountDto: UpdateUserAccountDto,
  ) {
    return this.userAccountService.update(+id, updateUserAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAccountService.remove(+id);
  }
}

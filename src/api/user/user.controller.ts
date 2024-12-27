import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, ForgotPasswordDto, SignInDto, UpdateUserDto, VerifyTokenDto } from './dto/user.dto';
import { EmailVerification } from './schema/emailVerification.schema';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() dto: CreateUserDto) {
    try {
      return await this.userService.signUp(dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('signin')
  async signIn(@Body() dto: SignInDto) {
    try {
      return await this.userService.signIn(dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    try {
      return await this.userService.forgotPassword(dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    try {
      return this.userService.updateUser(id, dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.userService.deleteUser(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //VERIFI EMAIL
  @Get('email/verify/:token')
  public async verifyEmail(@Param() params: VerifyTokenDto) {
    try {
      const isEmailVerified = await this.userService.verifyEmail(params.token);
      return { message: 'LOGIN.EMAIL_VERIFIED', data: isEmailVerified };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('email/resend-verification/:email')
  public async sendEmailVerification(@Param() params: EmailVerification) {
    try {
      await this.userService.createEmailToken(params.email);
      const isEmailSent = await this.userService.sendEmailVerification(params.email);
      if (isEmailSent) {
        return { message: 'LOGIN.EMAIL_RESENT', data: null };
        // return null;
      } else {
        return { message: 'REGISTRATION.ERROR.MAIL_NOT_SENT.EMAIL_RESENT' };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

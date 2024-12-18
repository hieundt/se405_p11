import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, ForgotPasswordDto, SignInDto, UpdateUserDto } from './dto/user.dto';

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
}

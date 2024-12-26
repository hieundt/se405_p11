import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'securepassword123', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'securepassword123', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'john_doe', description: 'Username of the user', required: false })
  @IsString()
  username?: string;

  @ApiProperty({ example: 'https://example.com/avatar.png', description: 'User avatar URL', required: false })
  @IsString()
  avatar?: string;

  @ApiProperty({ example: 'This is my bio', description: 'Short bio of the user', required: false })
  @IsString()
  bio?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'john_doe', description: 'Username of the user' })
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.png', description: 'User avatar URL' })
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({ example: 'This is my bio', description: 'Short bio of the user' })
  @IsString()
  bio?: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'securepassword123', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  confirmNewPassword: string;
}

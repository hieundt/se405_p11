import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly avatar: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly bio: string;
}

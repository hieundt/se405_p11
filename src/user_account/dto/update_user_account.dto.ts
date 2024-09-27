import { PartialType } from '@nestjs/swagger';
import { SignUpDto } from './sign_up.dto';

export class UpdateUserAccountDto extends PartialType(SignUpDto) {}

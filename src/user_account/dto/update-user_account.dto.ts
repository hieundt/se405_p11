import { PartialType } from '@nestjs/mapped-types';
import { UserAccount } from '../schema/user_account.schema';

export class UpdateUserAccountDto extends PartialType(UserAccount) {}

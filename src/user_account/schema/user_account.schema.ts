import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type UserAccountDocument = HydratedDocument<UserAccount>;

@Schema({ collection: 'user_account' })
export class UserAccount {
  _id: Types.ObjectId; //TODO: Consider cast to String

  @Prop({ type: SchemaTypes.String, unique: true, default: null })
  username: string;

  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  email: string;

  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  @Exclude({ toPlainOnly: true }) // HIde password from response
  passwordHash: string;

  @Prop({ type: SchemaTypes.String, default: null })
  avatar: string; // url

  @Prop({ type: SchemaTypes.String, default: null })
  bio: string;

  @Prop({ type: SchemaTypes.Date, default: Date.now })
  createdAt: Date;
}

export const UserAccountSchema = SchemaFactory.createForClass(UserAccount);

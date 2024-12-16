import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'user', timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ unique: true })
  username: string;

  @Prop({ required: true, default: false })
  isVerify: boolean;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop()
  avatar: string;

  @Prop()
  bio: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

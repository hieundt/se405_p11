import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EmailVerificationDocument = EmailVerification & Document;

@Schema({ collection: 'email_verification', timestamps: true })
export class EmailVerification {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  emailToken: string;

  @Prop()
  createdAt: Date;
}
export const EmailVerificationSchema = SchemaFactory.createForClass(EmailVerification);

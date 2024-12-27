import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CommentDocument = Comment & Document;

@Schema({ collection: 'comment' })
export class Comment {
  @Prop({ required: true, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  recipePostId: string;

  @Prop({ required: true })
  isParent: boolean;

  @Prop()
  parentId: string;

  @Prop({ equired: true })
  content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

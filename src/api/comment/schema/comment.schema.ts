import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ collection: 'comment' })
export class Comment {
  _id: Types.ObjectId;

  // @ApiProperty({ type: String, description: 'Ref to Account ID' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'UserAccount' })
  userId: Types.ObjectId;

  // @ApiProperty({ type: String, description: 'Ref to Post ID' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'RecipePost' })
  recipePostId: Types.ObjectId;

  // @ApiProperty({ type: String, description: 'Ref to Parent comment ID' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Comment' })
  parentId: Types.ObjectId;

  // @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.String, required: true })
  content: string;

  // @ApiProperty({ type: Date, required: false })
  @Prop({ type: SchemaTypes.Date, default: Date.now })
  // @IsOptional()
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

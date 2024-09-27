import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type RecipePostDocument = HydratedDocument<RecipePost>;

@Schema({ collection: 'recipe_post' })
export class RecipePost {
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'Ref to Account ID' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'UserAccount' })
  userId: Types.ObjectId;

  @ApiProperty({ type: String, description: 'Ref to Recipe ID' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Recipe' })
  recipeId: Types.ObjectId;

  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.String, required: true })
  content: string; // Nội dung bài viết

  @ApiProperty({ type: Date, required: false })
  @Prop({ type: SchemaTypes.Date, default: Date.now })
  @IsOptional()
  createdAt: Date;

  @ApiProperty({ type: [String], description: 'List of Rating IDs' })
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Rating' }] })
  rating: Types.ObjectId[];

  @ApiProperty({ type: [String], description: 'List of Comment IDs' })
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Comment' }] })
  comment: Types.ObjectId[];
}

export const RecipePostSchema = SchemaFactory.createForClass(RecipePost);

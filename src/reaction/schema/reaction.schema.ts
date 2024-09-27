import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type ReactionDocument = HydratedDocument<Reaction>;

@Schema({ collection: 'reaction' })
export class Reaction {
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'Ref to account ID' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'UserAccount' })
  userId: Types.ObjectId;

  @ApiProperty({ type: String, description: 'Ref to post ID' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'RecipePost' })
  recipePostId: Types.ObjectId;

  @ApiProperty({ type: Boolean, required: false })
  @Prop({ type: SchemaTypes.Boolean, default: false })
  status: boolean;

  @ApiProperty({ type: Date, required: false })
  @Prop({ type: SchemaTypes.Date, default: Date.now })
  @IsOptional()
  createdAt: Date;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);

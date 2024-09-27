import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type RatingDocument = HydratedDocument<Rating>;

enum RATING {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

@Schema({ collection: 'rating' })
export class Rating {
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'Ref to account ID' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'UserAccount' })
  userId: Types.ObjectId;

  @ApiProperty({ type: String, description: 'Ref to post ID' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'RecipePost' })
  recipePostId: Types.ObjectId;

  @ApiProperty({ enum: RATING, required: false })
  @Prop({
    type: SchemaTypes.Number,
    default: null,
    enum: RATING,
  })
  @IsEnum(RATING)
  @IsOptional()
  rate: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);

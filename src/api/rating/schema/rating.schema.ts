import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RatingDocument = Rating & Document;

@Schema({ collection: 'rating', timestamps: true })
export class Rating {
  @Prop({ required: true, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  recipeId: string;

  @Prop({ required: true, enum: [1, 2, 3, 4, 5] })
  rating: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RatingDocument = Rating & Document;

@Schema({ collection: 'rating', timestamps: true })
export class Rating {
  @Prop({ required: true, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  recipeId: string;

  @Prop({ required: true })
  rating: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);

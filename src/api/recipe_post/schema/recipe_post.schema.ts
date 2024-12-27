import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type RecipePostDocument = RecipePost & Document;

@Schema({ collection: 'recipe_post', timestamps: true })
export class RecipePost {
  @Prop({ required: true, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  source: string; // Binary

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }] })
  recipeList: string[];
}

export const RecipePostSchema = SchemaFactory.createForClass(RecipePost);

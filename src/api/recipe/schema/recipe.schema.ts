import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DifficultEnum } from 'src/enum';

export type RecipeDocument = Recipe & Document;

@Schema({ collection: 'recipe', timestamps: true })
export class Recipe {
  @Prop()
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  img: string;

  @Prop({ required: true })
  timeCook: number;

  @Prop({ required: true })
  difficult: DifficultEnum;

  @Prop({ required: true })
  caloTotal: number;

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }] })
  ingredientList: string[];

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Step' }] })
  stepList: string[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

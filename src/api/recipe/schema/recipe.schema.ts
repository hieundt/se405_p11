import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Ingredient } from 'src/api/ingredient/schema/ingredient.schema';
import { Step } from 'src/api/step/schema/step.schema';
import { DIFFICULT } from 'src/interfaces';

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

  @Prop({ required: true, enum: [1, 2, 3, 4, 5] })
  difficult: DIFFICULT;

  @Prop({ required: true })
  caloTotal: number;

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }] })
  ingredientList: Ingredient[];

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Step' }] })
  stepList: Step[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type IngredientDocument = Ingredient & Document;

@Schema({ collection: 'ingredient', timestamps: true })
export class Ingredient {
  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  calo: string;

  @Prop({ required: true })
  unit: string;

  @Prop({ required: true })
  description: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);

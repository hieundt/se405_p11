import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema({ collection: 'ingredient' })
export class Ingredient {
  _id: Types.ObjectId;

  // @Prop({ type: SchemaTypes.ObjectId, ref: 'Recipe' })
  // recipeId: Types.ObjectId;

  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: false })
  @Prop({ type: SchemaTypes.String, default: null })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ type: String, required: false })
  @Prop({ type: SchemaTypes.String, default: null })
  @IsString()
  @IsOptional()
  img: string;

  @ApiProperty({ type: Number })
  @Prop({ type: SchemaTypes.Number, required: true })
  @IsNumber()
  calo: number;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type RecipeDocument = HydratedDocument<Recipe>;

enum DIFFICULT {
  easy,
  normal,
  medium,
  hard,
  expert,
}

@Schema({ collection: 'recipe' })
export class Recipe {
  _id: Types.ObjectId;

  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'UserAccount' })
  userId: Types.ObjectId;

  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.String, unique: true })
  @IsString()
  title: string;

  @ApiProperty({ type: String, required: false })
  @Prop({ type: SchemaTypes.String, default: null })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ type: Number, required: false })
  @Prop({ type: SchemaTypes.Number, default: null })
  @IsNumber()
  @IsOptional()
  timeCook: number;

  @ApiProperty({ enum: DIFFICULT, required: false })
  @Prop({
    type: SchemaTypes.Number,
    default: DIFFICULT.normal,
    enum: DIFFICULT,
  })
  @IsEnum(DIFFICULT)
  difficult: string;

  @ApiProperty({ type: Number })
  @Prop({ type: SchemaTypes.Number, required: true })
  @IsNumber()
  calo: number;

  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.String, required: true })
  @IsString()
  status: string;

  @ApiProperty({ type: Date, required: false })
  @Prop({ type: SchemaTypes.Date, default: Date.now })
  @IsOptional()
  createdAt: Date;

  @ApiProperty({ type: [String], description: 'List of ingredient IDs' })
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Ingredient' }] }) // Array of references
  ingredient: Types.ObjectId[];

  @ApiProperty({ type: [String], description: 'List of step IDs' })
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Step' }] })
  step: Types.ObjectId[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

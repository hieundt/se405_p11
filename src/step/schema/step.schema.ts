import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type StepDocument = HydratedDocument<Step>;

@Schema({ collection: 'step' })
export class Step {
  _id: Types.ObjectId;

  @ApiProperty({ type: String, description: 'Ref to Recipe ID' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Recipe' })
  recipeId: Types.ObjectId;

  @ApiProperty({ type: Number })
  @Prop({ type: SchemaTypes.Number, required: true })
  @IsNumber()
  stepNumber: number;

  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.String, required: true })
  @IsString()
  instruction: string;
}

export const StepSchema = SchemaFactory.createForClass(Step);

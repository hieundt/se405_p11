import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type StepDocument = Step & Document;

@Schema({ collection: 'step', timestamps: true })
export class Step {
  @Prop()
  source: string;

  @Prop({ required: true })
  stepNumber: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  instruction: string;
}

export const StepSchema = SchemaFactory.createForClass(Step);

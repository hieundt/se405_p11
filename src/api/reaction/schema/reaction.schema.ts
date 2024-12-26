import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ReactionDocument = Reaction & Document;

@Schema({ collection: 'reaction', timestamps: true })
export class Reaction {
  @Prop({ required: true, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  recipePostId: string;

  @Prop({ required: true })
  react: boolean;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);

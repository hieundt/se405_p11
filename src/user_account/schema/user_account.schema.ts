import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Recipe } from 'src/recipe/schema/recipe.schema';

export type UserAccountDocument = HydratedDocument<UserAccount>;

@Schema({ collection: 'user_account' })
export class UserAccount {
  _id: Types.ObjectId; //TODO: Consider cast to String

  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  username: string;

  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  email: string;

  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  passwordHash: string;

  @Prop({ type: SchemaTypes.String, default: null })
  profilePicture: string; // url

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }] })
  recipeList: Recipe[]; // Ref tới công thức, user có nhiều công thức
}

export const UserAccountSchema = SchemaFactory.createForClass(UserAccount);

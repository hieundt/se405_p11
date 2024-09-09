import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema({ collection: 'recipe' })
export class Recipe {
  @Prop()
  title: string; // tên công thức

  @Prop()
  description: number; // mô tả hoặc gì đó đại loại

  @Prop()
  ingredients: string; // nguyên liệu, có thể sử dụng list cho cái này

  @Prop()
  instructions: string; // Hướng dẫn

  @Prop()
  prep_time: string; // Thời gian chuẩn bị

  @Prop()
  cook_time: string; // Thời gian nấu

  @Prop()
  servings: number; // Khẩu phần ăn, ví dụ 2 khẩu phần thì gấp đôi nguyên liệu lên

  @Prop()
  image_url: string; // Hình ảnh của món ăn

  @Prop()
  video_url: string; // Video hướng dẫn của món ăn
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

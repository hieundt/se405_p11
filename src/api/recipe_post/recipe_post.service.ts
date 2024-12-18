import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRecipePostDto } from './dto/update_recipe_post.dto';
import { RecipePost } from './schema/recipe_post.schema';

@Injectable()
export class RecipePostService {
  constructor(@InjectModel(RecipePost.name) private recipePostModel: Model<RecipePost>) {}

  create(dto: RecipePost) {
    const post = new this.recipePostModel(dto);
    return post.save();
  }

  findAll() {
    return this.recipePostModel.find();
  }

  findById(id: string) {
    const existPost = this.recipePostModel.findById(id).exec();
    if (!existPost) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return existPost;
  }

  update(id: string, dto: UpdateRecipePostDto) {
    const existPost = this.recipePostModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!existPost) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return existPost;
  }

  delete(id: string) {
    const existPost = this.recipePostModel.findByIdAndDelete(id);
    if (!existPost) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return existPost;
  }
}

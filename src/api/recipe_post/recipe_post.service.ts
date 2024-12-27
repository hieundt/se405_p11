import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecipePostDto } from './dto/recipe_post.dto';
import { RecipePost } from './schema/recipe_post.schema';
import { SchemaNotFoundException } from 'src/common/error';

@Injectable()
export class RecipePostService {
  constructor(@InjectModel(RecipePost.name) private recipePostModel: Model<RecipePost>) {}

  async create(dto: RecipePost) {
    const post = new this.recipePostModel(dto);
    return await post.save();
  }

  async findAll() {
    return await this.recipePostModel.find().exec();
  }

  async findById(id: string) {
    const existPost = await this.recipePostModel.findById(id).populate('userId', 'email username avatar').exec();
    if (!existPost) {
      throw new SchemaNotFoundException(RecipePost.name, id);
    }
    return existPost;
  }

  async update(id: string, dto: RecipePostDto): Promise<RecipePost> {
    const existRecipePost = await this.recipePostModel.findById(id).exec();

    if (!existRecipePost) {
      throw new SchemaNotFoundException(RecipePost.name, id);
    }

    const updateRecipePost: RecipePostDto = {
      userId: dto.userId ?? existRecipePost.userId,
      title: dto.title ?? existRecipePost.title,
      source: dto.source ?? existRecipePost.source,
      description: dto.description ?? existRecipePost.description,
      recipeList: dto.recipeList ?? existRecipePost.recipeList,
    };

    return await this.recipePostModel
      .findByIdAndUpdate(id, updateRecipePost, {
        new: true,
      })
      .exec();
  }

  async delete(id: string) {
    const existPost = await this.recipePostModel.findByIdAndDelete(id).exec();
    if (!existPost) {
      throw new SchemaNotFoundException(RecipePost.name, id);
    }
    return existPost;
  }
}

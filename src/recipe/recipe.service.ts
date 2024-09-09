import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './schema/recipe.schema';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async create(createDto: Recipe): Promise<Recipe> {
    const recipe = new this.recipeModel(createDto);
    return await recipe.save();
  }

  async findAll(): Promise<Recipe[]> {
    return await this.recipeModel.find().exec();
  }
}

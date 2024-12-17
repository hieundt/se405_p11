import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './schema/recipe.schema';
import { RecipeDto } from './dto/recipe.dto';
import { SchemaNotFoundException } from 'src/common/error';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async create(dto: RecipeDto) {
    const recipe = new this.recipeModel(dto);
    return await recipe.save();
  }

  async findAll() {
    return await this.recipeModel.find().exec();
  }

  async findById(id: string) {
    const existRecipe = await this.recipeModel.findById(id).populate('ingredient').populate('step').exec();
    if (!existRecipe) {
      throw new SchemaNotFoundException(Recipe.name, id);
    }
    return existRecipe;
  }

  async update(id: string, dto: RecipeDto) {
    const existRecipe = await this.recipeModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
    if (!existRecipe) {
      throw new SchemaNotFoundException(Recipe.name, id);
    }
    return existRecipe;
  }

  async delete(id: string) {
    const existRecipe = await this.recipeModel.findByIdAndDelete(id).exec();
    if (!existRecipe) {
      throw new SchemaNotFoundException(Recipe.name, id);
    }
    return existRecipe;
  }
}

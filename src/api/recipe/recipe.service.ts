import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './schema/recipe.schema';
import { UpdateRecipeDto } from './dto/update_recipe.dto';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  create(dto: Recipe) {
    const recipe = new this.recipeModel(dto);
    return recipe.save();
  }

  findAll() {
    return this.recipeModel.find();
  }

  findById(id: string) {
    const existRecipe = this.recipeModel
      .findById(id)
      .populate('ingredient')
      .populate('step')
      .exec();
    if (!existRecipe) {
      throw new NotFoundException(`Recipe #${id} not found`);
    }
    return existRecipe;
  }

  update(id: string, dto: UpdateRecipeDto) {
    const existRecipe = this.recipeModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!existRecipe) {
      throw new NotFoundException(`Recipe #${id} not found`);
    }
    return existRecipe;
  }

  remove(id: string) {
    const existRecipe = this.recipeModel.findByIdAndDelete(id);
    if (!existRecipe) {
      throw new NotFoundException(`Recipe #${id} not found`);
    }
    return existRecipe;
  }
}

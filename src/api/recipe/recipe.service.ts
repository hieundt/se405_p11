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
    const existRecipe = await this.recipeModel.findById(id).populate('ingredientList').populate('stepList').exec();
    if (!existRecipe) {
      throw new SchemaNotFoundException(Recipe.name, id);
    }
    return existRecipe;
  }

  async update(id: string, dto: RecipeDto): Promise<Recipe> {
    const existRecipe = await this.recipeModel.findById(id).exec();

    if (!existRecipe) {
      throw new SchemaNotFoundException(Recipe.name, id);
    }

    const updateRecipe: RecipeDto = {
      userId: dto.userId ?? existRecipe.userId,
      title: dto.title ?? existRecipe.title,
      description: dto.description ?? existRecipe.description,
      img: dto.img ?? existRecipe.img,
      timeCook: dto.timeCook ?? existRecipe.timeCook,
      difficult: dto.difficult ?? existRecipe.difficult,
      caloTotal: dto.caloTotal ?? existRecipe.caloTotal,
      ingredientList: dto.ingredientList ?? existRecipe.ingredientList,
      stepList: dto.stepList ?? existRecipe.stepList,
    };

    return await this.recipeModel
      .findByIdAndUpdate(id, updateRecipe, {
        new: true,
      })
      .exec();
  }

  async delete(id: string) {
    const existRecipe = await this.recipeModel.findByIdAndDelete(id).exec();
    if (!existRecipe) {
      throw new SchemaNotFoundException(Recipe.name, id);
    }
    return existRecipe;
  }
}

import { Injectable } from '@nestjs/common';
import { Ingredient } from './schema/ingredient.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchemaNotFoundException } from 'src/common/error';
import { IngredientDto } from './dto/ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(@InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>) {}

  async create(dto: IngredientDto) {
    const ingredient = new this.ingredientModel(dto);
    return await ingredient.save();
  }

  async findAll() {
    return await this.ingredientModel.find().exec();
  }

  async findById(id: string) {
    const existIngredient = await this.ingredientModel.findById(id).exec();
    if (!existIngredient) {
      throw new SchemaNotFoundException(Ingredient.name, id);
    }
    return existIngredient;
  }

  async update(id: string, dto: IngredientDto) {
    const existIngredient = await this.ingredientModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
    if (!existIngredient) {
      throw new SchemaNotFoundException(Ingredient.name, id);
    }
    return existIngredient;
  }

  async delete(id: string) {
    const existIngredient = await this.ingredientModel.findByIdAndDelete(id).exec();
    if (!existIngredient) {
      throw new SchemaNotFoundException(Ingredient.name, id);
    }
    return existIngredient;
  }
}

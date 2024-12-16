import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateIngredientDto } from './dto/update_ingredient.dto';
import { Ingredient } from './schema/ingredient.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
  ) {}

  create(dto: Ingredient) {
    const ingredient = new this.ingredientModel(dto);
    return ingredient.save();
  }

  findAll() {
    return this.ingredientModel.find();
  }

  findById(id: string) {
    const existIngredient = this.ingredientModel.findById(id).exec();
    if (!existIngredient) {
      throw new NotFoundException(`Ingredient #${id} not found`);
    }
    return existIngredient;
  }

  update(id: string, dto: UpdateIngredientDto) {
    const existIngredient = this.ingredientModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!existIngredient) {
      throw new NotFoundException(`Ingredient #${id} not found`);
    }
    return existIngredient;
  }

  remove(id: string) {
    const existIngredient = this.ingredientModel.findByIdAndDelete(id);
    if (!existIngredient) {
      throw new NotFoundException(`Ingredient #${id} not found`);
    }
    return existIngredient;
  }
}

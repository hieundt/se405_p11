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

  async update(id: string, dto: IngredientDto): Promise<Ingredient> {
    const existIngredient = await this.ingredientModel.findById(id).exec();

    if (!existIngredient) {
      throw new SchemaNotFoundException(Ingredient.name, id);
    }

    const updateIngredient: IngredientDto = {
      img: dto.img ?? existIngredient.img,
      name: dto.name ?? existIngredient.name,
      calo: dto.calo ?? existIngredient.calo,
      unit: dto.unit ?? existIngredient.unit,
      description: dto.description ?? existIngredient.description,
    };

    return await this.ingredientModel
      .findByIdAndUpdate(id, updateIngredient, {
        new: true,
      })
      .exec();
  }

  async delete(id: string) {
    const existIngredient = await this.ingredientModel.findByIdAndDelete(id).exec();
    if (!existIngredient) {
      throw new SchemaNotFoundException(Ingredient.name, id);
    }
    return existIngredient;
  }
}

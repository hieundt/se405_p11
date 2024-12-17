import { Injectable } from '@nestjs/common';
import { Step } from './schema/step.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StepDto } from './dto/step.dto';
import { SchemaNotFoundException } from 'src/common/error';

@Injectable()
export class StepService {
  constructor(@InjectModel(Step.name) private ingredientModel: Model<Step>) {}

  async create(dto: StepDto) {
    const ingredient = new this.ingredientModel(dto);
    return await ingredient.save();
  }

  async findAll() {
    return await this.ingredientModel.find().exec();
  }

  async findById(id: string) {
    const existStep = await this.ingredientModel.findById(id).exec();
    if (!existStep) {
      throw new SchemaNotFoundException(Step.name, id);
    }
    return existStep;
  }

  async update(id: string, dto: StepDto) {
    const existStep = await this.ingredientModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
    if (!existStep) {
      throw new SchemaNotFoundException(Step.name, id);
    }
    return existStep;
  }

  async delete(id: string) {
    const existStep = await this.ingredientModel.findByIdAndDelete(id).exec();
    if (!existStep) {
      throw new SchemaNotFoundException(Step.name, id);
    }
    return existStep;
  }
}

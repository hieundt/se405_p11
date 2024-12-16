import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStepDto } from './dto/update-step.dto';
import { Step } from './schema/step.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StepService {
  constructor(@InjectModel(Step.name) private ingredientModel: Model<Step>) {}

  create(dto: Step) {
    const ingredient = new this.ingredientModel(dto);
    return ingredient.save();
  }

  findAll() {
    return this.ingredientModel.find();
  }

  findById(id: string) {
    const existStep = this.ingredientModel.findById(id).exec();
    if (!existStep) {
      throw new NotFoundException(`Step #${id} not found`);
    }
    return existStep;
  }

  update(id: string, dto: UpdateStepDto) {
    const existStep = this.ingredientModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!existStep) {
      throw new NotFoundException(`Step #${id} not found`);
    }
    return existStep;
  }

  remove(id: string) {
    const existStep = this.ingredientModel.findByIdAndDelete(id);
    if (!existStep) {
      throw new NotFoundException(`Step #${id} not found`);
    }
    return existStep;
  }
}

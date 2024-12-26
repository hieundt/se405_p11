import { Injectable } from '@nestjs/common';
import { Step } from './schema/step.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StepDto } from './dto/step.dto';
import { SchemaNotFoundException } from 'src/common/error';

@Injectable()
export class StepService {
  constructor(@InjectModel(Step.name) private stepModel: Model<Step>) {}

  async create(dto: StepDto) {
    const ingredient = new this.stepModel(dto);
    return await ingredient.save();
  }

  async findAll() {
    return await this.stepModel.find().exec();
  }

  async findById(id: string) {
    const existStep = await this.stepModel.findById(id).exec();
    if (!existStep) {
      throw new SchemaNotFoundException(Step.name, id);
    }
    return existStep;
  }

  async update(id: string, dto: StepDto): Promise<Step> {
    const existStep = await this.stepModel.findById(id).exec();

    if (!existStep) {
      throw new SchemaNotFoundException(Step.name, id);
    }

    const updateStep: StepDto = {
      source: dto.source ?? existStep.source,
      stepNumber: dto.stepNumber ?? existStep.stepNumber,
      instruction: dto.instruction ?? existStep.instruction,
    };

    return await this.stepModel
      .findByIdAndUpdate(id, updateStep, {
        new: true,
      })
      .exec();
  }

  async delete(id: string) {
    const existStep = await this.stepModel.findByIdAndDelete(id).exec();
    if (!existStep) {
      throw new SchemaNotFoundException(Step.name, id);
    }
    return existStep;
  }
}

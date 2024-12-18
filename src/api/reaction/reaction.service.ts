import { Injectable } from '@nestjs/common';
import { Reaction } from './schema/reaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReactionDto } from './dto/reaction.dto';
import { SchemaNotFoundException } from 'src/common/error';

@Injectable()
export class ReactionService {
  constructor(@InjectModel(Reaction.name) private reactionModel: Model<Reaction>) {}

  async create(dto: ReactionDto): Promise<Reaction> {
    const reaction = new this.reactionModel(dto);
    return await reaction.save();
  }

  async findRecipePostReaction(recipePostId: string): Promise<Reaction[]> {
    return await this.reactionModel.find({ recipePostId }).exec();
  }

  async findAll(): Promise<Reaction[]> {
    return await this.reactionModel.find().exec();
  }

  async findById(id: string): Promise<Reaction> {
    const existReaction = await this.reactionModel.findById(id).exec();
    if (!existReaction) {
      throw new SchemaNotFoundException(Reaction.name, id);
    }
    return existReaction;
  }

  async delete(id: string): Promise<boolean> {
    const existReaction = await this.reactionModel.findByIdAndDelete(id).exec();
    if (!existReaction) {
      throw new SchemaNotFoundException(Reaction.name, id);
    }
    return true;
  }
}

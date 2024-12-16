import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { Reaction } from './schema/reaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReactionService {
  constructor(
    @InjectModel(Reaction.name) private reactionModel: Model<Reaction>,
  ) {}

  create(dto: Reaction) {
    const reaction = new this.reactionModel(dto);
    return reaction.save();
  }

  findAll() {
    return this.reactionModel.find();
  }

  findById(id: string) {
    const existReaction = this.reactionModel.findById(id).exec();
    if (!existReaction) {
      throw new NotFoundException(`Reaction #${id} not found`);
    }
    return existReaction;
  }

  update(id: string, dto: UpdateReactionDto) {
    const existReaction = this.reactionModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!existReaction) {
      throw new NotFoundException(`Reaction #${id} not found`);
    }
    return existReaction;
  }

  remove(id: string) {
    const existReaction = this.reactionModel.findByIdAndDelete(id);
    if (!existReaction) {
      throw new NotFoundException(`Reaction #${id} not found`);
    }
    return existReaction;
  }
}

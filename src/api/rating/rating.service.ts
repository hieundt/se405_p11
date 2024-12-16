import { NotFoundException } from '@nestjs/common';
import { RatingDto } from './dto/rating.dto';
import { Rating, RatingDocument } from './schema/rating.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class RatingService {
  constructor(
    @InjectModel(Rating.name)
    private ratingModel: Model<RatingDocument>,
  ) {}

  async create(dto: RatingDto): Promise<Rating> {
    const newRating = new this.ratingModel(dto);
    return newRating.save();
  }
  async findAll(): Promise<Rating[]> {
    return await this.ratingModel.find().exec();
  }

  async findById(id: string): Promise<Rating | null> {
    const existRating = await this.ratingModel.findById(id).exec();
    if (!existRating) {
      return null;
    }
    return existRating.populate('userId');
  }

  async update(id: string, dto: RatingDto) {
    const existRating = await this.ratingModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
    if (!existRating) {
      throw new NotFoundException(`Rating #${id} not found`);
    }
    return existRating;
  }

  async remove(id: string) {
    const existRating = await this.ratingModel.findByIdAndDelete(id).exec();
    if (!existRating) {
      throw new NotFoundException(`Rating #${id} not found`);
    }
    return existRating;
  }
}

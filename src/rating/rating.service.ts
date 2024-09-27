import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRatingDto } from './dto/update_rating.dto';
import { Rating } from './schema/rating.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RatingService {
  constructor(@InjectModel(Rating.name) private ratingModel: Model<Rating>) {}

  create(dto: Rating) {
    const rating = new this.ratingModel(dto);
    return rating.save();
  }

  findAll() {
    return this.ratingModel.find();
  }

  findById(id: string) {
    const existRating = this.ratingModel.findById(id).exec();
    if (!existRating) {
      throw new NotFoundException(`Rating #${id} not found`);
    }
    return existRating;
  }

  update(id: string, dto: UpdateRatingDto) {
    const existRating = this.ratingModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!existRating) {
      throw new NotFoundException(`Rating #${id} not found`);
    }
    return existRating;
  }

  remove(id: string) {
    const existRating = this.ratingModel.findByIdAndDelete(id);
    if (!existRating) {
      throw new NotFoundException(`Rating #${id} not found`);
    }
    return existRating;
  }
}

import { RatingDto } from './dto/rating.dto';
import { Rating, RatingDocument } from './schema/rating.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchemaNotFoundException } from 'src/common/error';

export class RatingService {
  constructor(
    @InjectModel(Rating.name)
    private ratingModel: Model<RatingDocument>,
  ) {}

  async create(dto: RatingDto): Promise<Rating> {
    const newRating = new this.ratingModel(dto);
    return await newRating.save();
  }

  async findAll(): Promise<Rating[]> {
    return await this.ratingModel.find().exec();
  }

  async findById(id: string): Promise<Rating | null> {
    const existRating = await this.ratingModel.findById(id).exec();
    if (!existRating) {
      throw new SchemaNotFoundException(Rating.name, id);
    }
    return existRating.populate('userId', 'email username avatar');
  }

  async update(id: string, dto: RatingDto): Promise<Rating> {
    const existRating = await this.ratingModel
      .findByIdAndUpdate(id, dto, {
        new: true,
      })
      .exec();
    if (!existRating) {
      throw new SchemaNotFoundException(Rating.name, id);
    }
    return existRating;
  }

  async delete(id: string): Promise<boolean> {
    const existRating = await this.ratingModel.findByIdAndDelete(id).exec();
    if (!existRating) {
      throw new SchemaNotFoundException(Rating.name, id);
    }
    return true;
  }
}

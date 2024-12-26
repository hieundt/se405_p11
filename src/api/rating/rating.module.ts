import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { Rating, RatingSchema } from './schema/rating.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingGateway } from './rating.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }])],
  controllers: [RatingController],
  providers: [RatingService, RatingGateway],
  exports: [RatingGateway],
})
export class RatingModule {}

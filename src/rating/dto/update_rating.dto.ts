import { PartialType } from '@nestjs/swagger';
import { Rating } from '../schema/rating.schema';

export class UpdateRatingDto extends PartialType(Rating) {}

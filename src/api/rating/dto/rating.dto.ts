import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { RATING } from 'src/interfaces';

export class RatingDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  recipeId: string;

  @ApiProperty({ enum: [1, 2, 3, 4, 5] })
  @IsEnum([1, 2, 3, 4, 5])
  @IsNotEmpty()
  rating: RATING;
}

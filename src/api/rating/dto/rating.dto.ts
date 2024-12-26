import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { RatingEnum } from 'src/enum';

export class RatingDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  recipeId: string;

  @ApiProperty({
    example: '2',
    enum: RatingEnum,
  })
  @IsEnum(RatingEnum)
  @IsNotEmpty()
  rating: RatingEnum;
}

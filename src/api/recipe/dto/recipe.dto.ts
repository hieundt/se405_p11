import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { DifficultEnum } from 'src/enum';

export class RecipeDto {
  @ApiProperty({ example: '60d8b9e6f1a7f231d8e5b123', description: 'User ID of the recipe creator' })
  @IsMongoId()
  @IsOptional()
  userId?: string;

  @ApiProperty({ example: 'Delicious Chocolate Cake', description: 'Title of the recipe' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'A simple and delicious chocolate cake recipe', description: 'Description of the recipe' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'URL to the recipe image' })
  @IsString()
  @IsOptional()
  img?: string;

  @ApiProperty({ example: 30, description: 'Time required to cook the recipe in minutes' })
  @IsNumber()
  @IsNotEmpty()
  timeCook: number;

  @ApiProperty({
    example: '2',
    description: 'Difficulty level of the recipe (1-5)',
    enum: DifficultEnum,
  })
  @IsEnum(DifficultEnum)
  @IsNotEmpty()
  difficult: DifficultEnum;

  @ApiProperty({ example: 500, description: 'Total calories for the recipe' })
  @IsNumber()
  @IsNotEmpty()
  caloTotal: number;

  @ApiProperty({
    example: ['60d8b9e6f1a7f231d8e5b111', '60d8b9e6f1a7f231d8e5b112'],
    description: 'List of ingredient IDs',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  ingredientList: string[];

  @ApiProperty({
    example: ['60d8b9e6f1a7f231d8e5c123', '60d8b9e6f1a7f231d8e5c124'],
    description: 'List of step IDs',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  stepList: string[];
}

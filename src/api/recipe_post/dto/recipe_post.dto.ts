import { IsString, IsNotEmpty, IsOptional, IsArray, IsMongoId, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecipePostDto {
  @ApiProperty({
    example: '60d8b9e6f1a7f231d8e5b123',
    description: 'User ID who created the recipe post',
  })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'My Favorite Recipes',
    description: 'Title of the recipe post',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'A collection of my favorite recipes.',
    description: 'Optional description for the recipe post',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: ['60d8b9e6f1a7f231d8e5b456', '60d8b9e6f1a7f231d8e5b789'],
    description: 'List of recipe IDs included in the post',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  recipeList: string[];
}

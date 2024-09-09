import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Recipe } from '../schema/recipe.schema';

export class UpdateRecipeDto extends PartialType(Recipe) {
  // TODO: Implement your own DTO
  @ApiProperty()
  title: string;
}

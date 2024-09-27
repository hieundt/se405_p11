import { PartialType } from '@nestjs/swagger';
import { Recipe } from '../schema/recipe.schema';

export class UpdateRecipeDto extends PartialType(Recipe) {}

import { PartialType } from '@nestjs/swagger';
import { Ingredient } from '../schema/ingredient.schema';

export class UpdateIngredientDto extends PartialType(Ingredient) {}

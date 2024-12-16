import { PartialType } from '@nestjs/swagger';
import { RecipePost } from '../schema/recipe_post.schema';

export class UpdateRecipePostDto extends PartialType(RecipePost) {}

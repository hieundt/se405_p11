import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './schema/recipe.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async create(@Body() createDto: Recipe): Promise<Recipe> {
    return await this.recipeService.create(createDto);
  }

  @Get()
  async findAll(): Promise<Recipe[]> {
    return await this.recipeService.findAll();
  }
}

import { Body, Controller, Get, Param, Post, Patch, Delete, InternalServerErrorException } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { ApiTags } from '@nestjs/swagger';
import { RecipeDto } from './dto/recipe.dto';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async create(@Body() dto: RecipeDto) {
    try {
      return await this.recipeService.create(dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.recipeService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.recipeService.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: RecipeDto) {
    try {
      return await this.recipeService.update(id, dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.recipeService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

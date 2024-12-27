import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { RecipePostDto } from './dto/recipe_post.dto';
import { RecipePostService } from './recipe_post.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('RecipePost')
@Controller('recipe_post')
export class RecipePostController {
  constructor(private readonly postService: RecipePostService) {}

  @Post()
  async create(@Body() dto: RecipePostDto) {
    try {
      return await this.postService.create(dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.postService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.postService.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: RecipePostDto) {
    try {
      return await this.postService.update(id, dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.postService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

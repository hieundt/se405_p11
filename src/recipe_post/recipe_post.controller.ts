import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecipePost } from './schema/recipe_post.schema';
import { UpdateRecipePostDto } from './dto/update_recipe_post.dto';
import { RecipePostService } from './recipe_post.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('RecipePost')
@Controller('recipe_post')
export class RecipePostController {
  constructor(private readonly postService: RecipePostService) {}

  @Post()
  create(@Body() dto: RecipePost) {
    return this.postService.create(dto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.postService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRecipePostDto) {
    return this.postService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}

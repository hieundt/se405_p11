import { Controller, Get, Post, Body, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ApiTags } from '@nestjs/swagger';
import { ReactionDto } from './dto/reaction.dto';

@ApiTags('Reaction')
@Controller('reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}
  @Post()
  async create(@Body() dto: ReactionDto) {
    try {
      return await this.reactionService.create(dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':recipePostId')
  async findRecipePostReaction(@Param('recipePostId') recipePostId: string) {
    try {
      return await this.reactionService.findRecipePostReaction(recipePostId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.reactionService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.reactionService.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.reactionService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';
import { CommentDto } from './dto/comment.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() dto: CommentDto) {
    try {
      return await this.commentService.create(dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.commentService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':recipePostId')
  async findRecipePostComment(@Param('id') recipePostId: string) {
    try {
      return await this.commentService.findRecipePostComment(recipePostId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':parentId')
  async findReplyComment(@Param('id') parentId: string) {
    try {
      return await this.commentService.findReplyComment(parentId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.commentService.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: CommentDto) {
    try {
      return await this.commentService.update(id, dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.commentService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

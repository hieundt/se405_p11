import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { RatingService } from './rating.service';
import { ApiTags } from '@nestjs/swagger';
import { RatingDto } from './dto/rating.dto';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Post()
  async create(@Body() dto: RatingDto) {
    try {
      return await this.ratingService.create(dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.ratingService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.ratingService.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: RatingDto) {
    try {
      return await this.ratingService.update(id, dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.ratingService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

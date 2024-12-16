import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RatingService } from './rating.service';
import { ApiTags } from '@nestjs/swagger';
import { RatingDto } from './dto/rating.dto';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Post()
  async create(@Body() dto: RatingDto) {
    return await this.ratingService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.ratingService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.ratingService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: RatingDto) {
    return await this.ratingService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ratingService.remove(id);
  }
}

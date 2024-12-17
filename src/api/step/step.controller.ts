import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { StepService } from './step.service';
import { ApiTags } from '@nestjs/swagger';
import { StepDto } from './dto/step.dto';

@ApiTags('Step')
@Controller('step')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Post()
  async create(@Body() dto: StepDto) {
    try {
      return await this.stepService.create(dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.stepService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return await this.stepService.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: StepDto) {
    try {
      return await this.stepService.update(id, dto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.stepService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

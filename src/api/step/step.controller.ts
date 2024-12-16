import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StepService } from './step.service';
import { UpdateStepDto } from './dto/update-step.dto';
import { ApiTags } from '@nestjs/swagger';
import { Step } from './schema/step.schema';

@ApiTags('Step')
@Controller('step')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Post()
  create(@Body() dto: Step) {
    return this.stepService.create(dto);
  }

  @Get()
  findAll() {
    return this.stepService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.stepService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStepDto) {
    return this.stepService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stepService.remove(id);
  }
}

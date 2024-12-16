import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { Reaction } from './schema/reaction.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reaction')
@Controller('reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @Post()
  create(@Body() dto: Reaction) {
    return this.reactionService.create(dto);
  }

  @Get()
  findAll() {
    return this.reactionService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.reactionService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReactionDto) {
    return this.reactionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reactionService.remove(id);
  }
}

import { PartialType } from '@nestjs/swagger';
import { Reaction } from '../schema/reaction.schema';

export class UpdateReactionDto extends PartialType(Reaction) {}

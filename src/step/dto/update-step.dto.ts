import { PartialType } from '@nestjs/swagger';
import { Step } from '../schema/step.schema';

export class UpdateStepDto extends PartialType(Step) {}

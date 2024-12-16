import { Module } from '@nestjs/common';
import { StepService } from './step.service';
import { StepController } from './step.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Step, StepSchema } from './schema/step.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Step.name, schema: StepSchema }]),
  ],
  controllers: [StepController],
  providers: [StepService],
})
export class StepModule {}

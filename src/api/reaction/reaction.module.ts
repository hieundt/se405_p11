import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reaction, ReactionSchema } from './schema/reaction.schema';
import { ReactionGateway } from './reaction.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reaction.name, schema: ReactionSchema }])],
  controllers: [ReactionController],
  providers: [ReactionService, ReactionGateway],
  exports: [ReactionGateway],
})
export class ReactionModule {}

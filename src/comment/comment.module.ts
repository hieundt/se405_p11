import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schema/comment.schema';
import { Comment } from './schema/comment.schema';
import { CommentGateWay } from './comment.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  // controllers: [CommentController],
  providers: [CommentService, CommentGateWay],
  exports: [CommentService],
})
export class CommentModule {}

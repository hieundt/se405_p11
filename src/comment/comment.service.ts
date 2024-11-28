import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCommentDto } from './dto/update_comment.dto';
import { Comment } from './schema/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  create(dto: Comment) {
    const comment = new this.commentModel(dto);
    comment.save();
    return { status: 'success', message: comment };
  }

  findAll() {
    return this.commentModel.find();
  }

  findById(id: string) {
    const existComment = this.commentModel.findById(id).exec();
    if (!existComment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }
    return existComment;
  }

  update(id: string, dto: UpdateCommentDto) {
    const existComment = this.commentModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!existComment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }
    return existComment;
  }

  remove(id: string) {
    const existComment = this.commentModel.findByIdAndDelete(id);
    if (!existComment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }
    return existComment;
  }
}

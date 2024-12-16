import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateCommentDto } from './dto/update_comment.dto';
import { Comment } from './schema/comment.schema';
import { CreateCommentDto } from './dto/create_comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(dto: Comment) {
    const { userId, recipePostId, parentId, content } = dto;

    const commentData = {
      userId: new Types.ObjectId(userId),
      recipePostId: new Types.ObjectId(recipePostId),
      parentId: parentId ? new Types.ObjectId(parentId) : null,
      content,
    };

    const comment = new this.commentModel(commentData);
    await comment.save();
    return comment;
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

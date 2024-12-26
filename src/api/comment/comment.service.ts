import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schema/comment.schema';
import { CommentDto } from './dto/comment.dto';
import { SchemaNotFoundException } from 'src/common/error';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}

  async create(dto: CommentDto): Promise<Comment> {
    const comment = new this.commentModel(dto);
    return await comment.save();
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentModel.find().exec();
  }

  async findRecipePostComment(recipePostId: string): Promise<Comment[]> {
    return await this.commentModel.find({ recipePostId }).exec();
  }

  async findReplyComment(parentId: string): Promise<Comment[]> {
    return await this.commentModel.find({ parentId }).exec();
  }

  async findById(id: string): Promise<Comment> {
    const existComment = await this.commentModel.findById(id).exec();
    if (!existComment) {
      throw new SchemaNotFoundException(Comment.name, id);
    }
    return existComment;
  }

  async update(id: string, dto: CommentDto): Promise<Comment> {
    const existComment = await this.commentModel.findById(id).exec();

    if (!existComment) {
      throw new SchemaNotFoundException(Comment.name, id);
    }

    const updateComment: CommentDto = {
      userId: dto.userId ?? existComment.userId,
      recipePostId: dto.recipePostId ?? existComment.recipePostId,
      isParent: dto.isParent ?? existComment.isParent,
      parentId: dto.parentId ?? existComment.parentId,
      content: dto.content ?? existComment.content,
    };

    return await this.commentModel
      .findByIdAndUpdate(id, updateComment, {
        new: true,
      })
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const existComment = await this.commentModel.findById(id).exec();
    if (!existComment) {
      throw new SchemaNotFoundException(Comment.name, id);
    }

    if (existComment.isParent) {
      await this.commentModel.deleteMany({ parentId: id }).exec();
    }
    await this.commentModel.findByIdAndDelete(id).exec();

    return true;
  }
}

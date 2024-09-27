import { PartialType } from '@nestjs/swagger';
import { Comment } from '../schema/comment.schema';

export class UpdateCommentDto extends PartialType(Comment) {}

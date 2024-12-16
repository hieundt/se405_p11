import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommentDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  recipePostId: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  parentId?: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  content: string;
}

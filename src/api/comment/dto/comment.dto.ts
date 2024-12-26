import { IsString, IsMongoId, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ example: '60d8b9e6f1a7f231d8e5b123', description: 'User ID who created the comment' })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '60d8b9e6f1a7f231d8e5b456', description: 'Recipe post ID to which the comment belongs' })
  @IsMongoId()
  @IsNotEmpty()
  recipePostId: string;

  @ApiProperty({ example: true, description: 'Whether the comment is a parent comment' })
  @IsBoolean()
  @IsNotEmpty()
  isParent: boolean;

  @ApiProperty({
    example: '60d8b9e6f1a7f231d8e5b789',
    description: 'Parent comment ID (empty if it is a parent comment)',
  })
  @IsMongoId()
  @IsNotEmpty()
  parentId: string;

  @ApiProperty({
    example: 'This recipe is amazing!',
    description: 'Content of the comment',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}

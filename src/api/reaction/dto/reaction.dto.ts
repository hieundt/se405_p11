import { IsMongoId, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReactionDto {
  @ApiProperty({
    example: '60d8b9e6f1a7f231d8e5b123',
    description: 'ID of the user who reacted',
  })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: '60d8b9e6f1a7f231d8e5b456',
    description: 'ID of the recipe post that was reacted to',
  })
  @IsMongoId()
  @IsNotEmpty()
  recipePostId: string;

  @ApiProperty({
    example: true,
    description: 'Reaction status (true for like, false for dislike)',
  })
  @IsBoolean()
  @IsNotEmpty()
  react: boolean;
}

import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StepDto {
  @ApiProperty({
    example: 'https://example.com/video.mp4',
    description: 'Optional source URL for step media (e.g., image, video)',
  })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiProperty({ example: 1, description: 'The step number in the recipe sequence' })
  @IsNumber()
  @IsNotEmpty()
  stepNumber: number;

  @ApiProperty({ example: 'Preheat Oven', description: 'Title of the step' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Preheat the oven to 180 degrees Celsius and prepare a baking tray.',
    description: 'Detailed instruction for the step',
  })
  @IsString()
  @IsNotEmpty()
  instruction: string;
}

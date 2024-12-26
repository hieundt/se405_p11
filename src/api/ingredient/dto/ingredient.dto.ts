import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UnitEnum } from 'src/enum';

export class IngredientDto {
  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Image URL for the ingredient' })
  @IsUrl()
  @IsNotEmpty()
  img: string;

  @ApiProperty({ example: 'Tomato', description: 'Name of the ingredient' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '20', description: 'Calories of the ingredient' })
  @IsString()
  @IsNotEmpty()
  calo: string;

  @ApiProperty({
    example: 'gram',
    description: 'Unit of measurement for the ingredient',
    enum: UnitEnum,
  })
  @IsEnum(UnitEnum)
  @IsNotEmpty()
  unit: UnitEnum;

  @ApiProperty({ example: 'Fresh red tomatoes', description: 'Short description of the ingredient' })
  @IsString()
  @IsOptional()
  description: string;
}

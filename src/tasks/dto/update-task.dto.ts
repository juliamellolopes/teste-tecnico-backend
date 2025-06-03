import { IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'O título não pode estar vazio' })
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'O campo completed deve ser verdadeiro ou falso' })
  completed?: boolean;
}

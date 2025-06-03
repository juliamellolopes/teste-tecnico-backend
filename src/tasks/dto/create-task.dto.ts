import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Desenvolver aplicaçao NestJS' })
  @IsNotEmpty({ message: 'O título é obrigatório' })
  title: string;

  @ApiPropertyOptional({ example: 'Fazer o módulo auth' })
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'O campo completed deve ser verdadeiro ou falso' })
  completed?: boolean;
}

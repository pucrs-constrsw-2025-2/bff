import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsObject } from 'class-validator';

export class FilterDto {
  @ApiPropertyOptional({
    description: 'Filter criteria as JSON object',
    example: '{"status":"active","category":"tech"}',
  })
  @IsOptional()
  @IsString()
  filter?: string;

  @ApiPropertyOptional({
    description: 'Sort field and direction',
    example: 'createdAt:desc',
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiPropertyOptional({
    description: 'Fields to include in response (comma-separated)',
    example: 'id,name,email',
  })
  @IsOptional()
  @IsString()
  fields?: string;
}


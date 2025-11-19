import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsEnum, Min, Max, MaxLength } from 'class-validator';
import { RoomStatus } from './create-room.dto';

export class QueryRoomDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: 'Maximum number of items per page',
    minimum: 1,
    maximum: 100,
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Filter by building',
    maxLength: 10,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  building?: string;

  @ApiPropertyOptional({
    description: 'Filter by category',
    maxLength: 10,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  category?: string;

  @ApiPropertyOptional({
    description: 'Filter by exact status',
    enum: RoomStatus,
  })
  @IsOptional()
  @IsEnum(RoomStatus)
  status?: RoomStatus;

  @ApiPropertyOptional({
    description: 'Filter for minimum allowed capacity',
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  minCapacity?: number;

  @ApiPropertyOptional({
    description: 'Filter for maximum allowed capacity',
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  maxCapacity?: number;

  @ApiPropertyOptional({
    description: 'Filter for exact room number',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  number?: string;
}

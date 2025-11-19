import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, MaxLength, Min } from 'class-validator';
import { RoomStatus } from './create-room.dto';

export class PatchRoomDto {
  @ApiPropertyOptional({
    description: 'Optional updated room number',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  number?: string;

  @ApiPropertyOptional({
    description: 'Optional updated building identifier',
    maxLength: 10,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  building?: string;

  @ApiPropertyOptional({
    description: 'Optional updated category',
    maxLength: 10,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  category?: string;

  @ApiPropertyOptional({
    description: 'Optional updated capacity',
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;

  @ApiPropertyOptional({
    description: 'Optional updated floor',
  })
  @IsOptional()
  @IsNumber()
  floor?: number;

  @ApiPropertyOptional({
    description: 'Optional updated description',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiPropertyOptional({
    description: 'Optional updated status',
    enum: RoomStatus,
  })
  @IsOptional()
  @IsEnum(RoomStatus)
  status?: RoomStatus;
}

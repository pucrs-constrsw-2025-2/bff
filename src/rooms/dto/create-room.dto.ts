import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, MaxLength, Min } from 'class-validator';

export enum RoomStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
}

export class CreateRoomDto {
  @ApiProperty({
    description: 'Unique room number within the building',
    example: '101A',
    maxLength: 20,
  })
  @IsString()
  @MaxLength(20)
  number: string;

  @ApiProperty({
    description: 'Building identifier where the room is located',
    example: 'BLD1',
    maxLength: 10,
  })
  @IsString()
  @MaxLength(10)
  building: string;

  @ApiProperty({
    description: 'Category describing the room usage',
    example: 'LAB',
    maxLength: 10,
  })
  @IsString()
  @MaxLength(10)
  category: string;

  @ApiProperty({
    description: 'Total capacity of the room',
    example: 30,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  capacity: number;

  @ApiProperty({
    description: 'Floor number where the room is located',
    example: 2,
  })
  @IsNumber()
  floor: number;

  @ApiPropertyOptional({
    description: 'Additional information about the room',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiPropertyOptional({
    description: 'Operational status of the room',
    enum: RoomStatus,
    default: RoomStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(RoomStatus)
  status?: RoomStatus;
}

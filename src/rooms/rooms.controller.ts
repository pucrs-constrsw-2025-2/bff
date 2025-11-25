import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar salas' })
  async findAll(@Query() query: any) {
    return this.roomsService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Criar sala' })
  async create(@Body() createDto: any) {
    return this.roomsService.create(createDto);
  }

  @Get(':roomId')
  @ApiOperation({ summary: 'Buscar sala por ID' })
  async findOne(@Param('roomId') roomId: string) {
    return this.roomsService.findOne(roomId);
  }

  @Put(':roomId')
  @ApiOperation({ summary: 'Atualizar sala (completo)' })
  async update(@Param('roomId') roomId: string, @Body() updateDto: any) {
    return this.roomsService.update(roomId, updateDto);
  }

  @Patch(':roomId')
  @ApiOperation({ summary: 'Atualizar sala (parcial)' })
  async patch(@Param('roomId') roomId: string, @Body() updateDto: any) {
    return this.roomsService.patch(roomId, updateDto);
  }

  @Delete(':roomId')
  @ApiOperation({ summary: 'Deletar sala' })
  async remove(@Param('roomId') roomId: string) {
    return this.roomsService.remove(roomId);
  }
}


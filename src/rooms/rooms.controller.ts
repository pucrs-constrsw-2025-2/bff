import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
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

  @Get(':id')
  @ApiOperation({ summary: 'Buscar sala por ID' })
  async findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar sala' })
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.roomsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar sala' })
  async remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}


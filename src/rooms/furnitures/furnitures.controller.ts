import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FurnituresService } from './furnitures.service';

@ApiTags('Rooms')
@Controller('rooms/:roomId/furnitures')
export class FurnituresController {
  constructor(private readonly furnituresService: FurnituresService) {}

  @Get()
  @ApiOperation({ summary: 'Listar mobílias (scaffold - retorna 501)' })
  async findAll(@Param('roomId') roomId: string) {
    return this.furnituresService.findAll(roomId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar mobília (scaffold - retorna 501)' })
  async create(@Param('roomId') roomId: string, @Body() createDto: any) {
    return this.furnituresService.create(roomId, createDto);
  }

  @Get(':furnitureId')
  @ApiOperation({ summary: 'Buscar mobília (scaffold - retorna 501)' })
  async findOne(@Param('roomId') roomId: string, @Param('furnitureId') furnitureId: string) {
    return this.furnituresService.findOne(roomId, furnitureId);
  }

  @Put(':furnitureId')
  @ApiOperation({ summary: 'Substituir mobília (scaffold - retorna 501)' })
  async update(
    @Param('roomId') roomId: string,
    @Param('furnitureId') furnitureId: string,
    @Body() updateDto: any,
  ) {
    return this.furnituresService.update(roomId, furnitureId, updateDto);
  }

  @Patch(':furnitureId')
  @ApiOperation({ summary: 'Atualizar mobília (scaffold - retorna 501)' })
  async patch(
    @Param('roomId') roomId: string,
    @Param('furnitureId') furnitureId: string,
    @Body() updateDto: any,
  ) {
    return this.furnituresService.patch(roomId, furnitureId, updateDto);
  }

  @Delete(':furnitureId')
  @ApiOperation({ summary: 'Deletar mobília (scaffold - retorna 501)' })
  async remove(@Param('roomId') roomId: string, @Param('furnitureId') furnitureId: string) {
    return this.furnituresService.remove(roomId, furnitureId);
  }
}


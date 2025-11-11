import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar reservas' })
  async findAll(@Query() query: any) {
    return this.reservationsService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Criar reserva' })
  async create(@Body() createDto: any) {
    return this.reservationsService.create(createDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar reserva por ID' })
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar reserva' })
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.reservationsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover reserva' })
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}


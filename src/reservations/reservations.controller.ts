import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
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

  @Get(':reservationId')
  @ApiOperation({ summary: 'Buscar reserva por ID' })
  async findOne(@Param('reservationId') reservationId: string) {
    return this.reservationsService.findOne(reservationId);
  }

  @Put(':reservationId')
  @ApiOperation({ summary: 'Atualizar reserva (completo)' })
  async update(@Param('reservationId') reservationId: string, @Body() updateDto: any) {
    return this.reservationsService.update(reservationId, updateDto);
  }

  @Patch(':reservationId')
  @ApiOperation({ summary: 'Atualizar reserva (parcial)' })
  async patch(@Param('reservationId') reservationId: string, @Body() updateDto: any) {
    return this.reservationsService.patch(reservationId, updateDto);
  }

  @Delete(':reservationId')
  @ApiOperation({ summary: 'Remover reserva' })
  async remove(@Param('reservationId') reservationId: string) {
    return this.reservationsService.remove(reservationId);
  }
}


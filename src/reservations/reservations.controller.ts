import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PatchReservationDto } from './dto/patch-reservation.dto';
import { QueryReservationDto } from './dto/query-reservation.dto';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar reservas' })
  async findAll(@Query() query: QueryReservationDto) {
    return this.reservationsService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Criar reserva' })
  async create(@Body() createDto: CreateReservationDto) {
    return this.reservationsService.create(createDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar reserva por ID' })
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar reserva' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateReservationDto) {
    return this.reservationsService.update(id, updateDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar parcialmente uma reserva' })
  async patch(@Param('id') id: string, @Body() patchDto: PatchReservationDto) {
    return this.reservationsService.patch(id, patchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover reserva' })
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}


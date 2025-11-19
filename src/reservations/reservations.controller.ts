import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PatchReservationDto } from './dto/patch-reservation.dto';
import { QueryReservationDto } from './dto/query-reservation.dto';
import { Request } from 'express';

@ApiTags('Reservations')
@ApiBearerAuth('bearer')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar reservas' })
  async findAll(@Query() query: QueryReservationDto, @Req() req: Request) {
    const authorization = req.headers['authorization'] as string | undefined;
    return this.reservationsService.findAll(query, authorization);
  }

  @Post()
  @ApiOperation({ summary: 'Criar reserva' })
  async create(@Body() createDto: CreateReservationDto, @Req() req: Request) {
    const authorization = req.headers['authorization'] as string | undefined;
    return this.reservationsService.create(createDto, authorization);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar reserva por ID' })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const authorization = req.headers['authorization'] as string | undefined;
    return this.reservationsService.findOne(id, authorization);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar reserva' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateReservationDto, @Req() req: Request) {
    const authorization = req.headers['authorization'] as string | undefined;
    return this.reservationsService.update(id, updateDto, authorization);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar parcialmente uma reserva' })
  async patch(@Param('id') id: string, @Body() patchDto: PatchReservationDto, @Req() req: Request) {
    const authorization = req.headers['authorization'] as string | undefined;
    return this.reservationsService.patch(id, patchDto, authorization);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover reserva' })
  async remove(@Param('id') id: string, @Req() req: Request) {
    const authorization = req.headers['authorization'] as string | undefined;
    return this.reservationsService.remove(id, authorization);
  }
}


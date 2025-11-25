import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthorizedUsersService } from './authorized-users.service';

@ApiTags('Reservations')
@Controller('reservations/:reservationId/authorized-users')
export class AuthorizedUsersController {
  constructor(private readonly authorizedUsersService: AuthorizedUsersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar usuários autorizados de uma reserva' })
  async findAll(@Param('reservationId') reservationId: string) {
    return this.authorizedUsersService.findAll(reservationId);
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar usuário autorizado à reserva' })
  async create(@Param('reservationId') reservationId: string, @Body() createDto: any) {
    return this.authorizedUsersService.create(reservationId, createDto);
  }

  @Get(':authorizedUserId')
  @ApiOperation({ summary: 'Buscar usuário autorizado específico' })
  async findOne(
    @Param('reservationId') reservationId: string,
    @Param('authorizedUserId') authorizedUserId: string,
  ) {
    return this.authorizedUsersService.findOne(reservationId, authorizedUserId);
  }

  @Put(':authorizedUserId')
  @ApiOperation({ summary: 'Atualizar usuário autorizado (completo)' })
  async update(
    @Param('reservationId') reservationId: string,
    @Param('authorizedUserId') authorizedUserId: string,
    @Body() updateDto: any,
  ) {
    return this.authorizedUsersService.update(reservationId, authorizedUserId, updateDto);
  }

  @Patch(':authorizedUserId')
  @ApiOperation({ summary: 'Atualizar usuário autorizado (parcial)' })
  async patch(
    @Param('reservationId') reservationId: string,
    @Param('authorizedUserId') authorizedUserId: string,
    @Body() updateDto: any,
  ) {
    return this.authorizedUsersService.patch(reservationId, authorizedUserId, updateDto);
  }

  @Delete(':authorizedUserId')
  @ApiOperation({ summary: 'Remover usuário autorizado da reserva' })
  async remove(
    @Param('reservationId') reservationId: string,
    @Param('authorizedUserId') authorizedUserId: string,
  ) {
    return this.authorizedUsersService.remove(reservationId, authorizedUserId);
  }
}


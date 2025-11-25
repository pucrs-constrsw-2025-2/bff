import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar roles' })
  async findAll(@Query('enabled') enabled?: boolean) {
    return this.rolesService.findAll(enabled);
  }

  @Post()
  @ApiOperation({ summary: 'Criar role' })
  async create(@Body() createDto: any) {
    return this.rolesService.create(createDto);
  }

  @Get(':roleId')
  @ApiOperation({ summary: 'Buscar role por ID' })
  async findOne(@Param('roleId') roleId: string) {
    return this.rolesService.findOne(roleId);
  }

  @Put(':roleId')
  @ApiOperation({ summary: 'Atualizar role (completo)' })
  async update(@Param('roleId') roleId: string, @Body() updateDto: any) {
    return this.rolesService.update(roleId, updateDto);
  }

  @Patch(':roleId')
  @ApiOperation({ summary: 'Atualizar role (parcial)' })
  async patch(@Param('roleId') roleId: string, @Body() updateDto: any) {
    return this.rolesService.patch(roleId, updateDto);
  }

  @Delete(':roleId')
  @ApiOperation({ summary: 'Excluir role' })
  async remove(@Param('roleId') roleId: string) {
    return this.rolesService.remove(roleId);
  }
}


import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
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

  @Get(':id')
  @ApiOperation({ summary: 'Buscar role por ID' })
  async findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar role' })
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.rolesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir role' })
  async remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}


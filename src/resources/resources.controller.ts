import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ResourcesService } from './resources.service';

@ApiTags('Resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar recursos' })
  async findAll(@Query() query: any) {
    return this.resourcesService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Criar recurso' })
  async create(@Body() createDto: any) {
    return this.resourcesService.create(createDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar recurso por ID' })
  async findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar recurso' })
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.resourcesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar recurso' })
  async remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }
}


import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
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

  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Buscar recursos por categoria' })
  async getResourcesByCategory(@Param('categoryId') categoryId: string) {
    return this.resourcesService.getResourcesByCategory(categoryId);
  }

  @Get(':resourceId')
  @ApiOperation({ summary: 'Buscar recurso por ID' })
  async findOne(@Param('resourceId') resourceId: string) {
    return this.resourcesService.findOne(resourceId);
  }

  @Put(':resourceId')
  @ApiOperation({ summary: 'Atualizar recurso (completo)' })
  async update(@Param('resourceId') resourceId: string, @Body() updateDto: any) {
    return this.resourcesService.update(resourceId, updateDto);
  }

  @Patch(':resourceId')
  @ApiOperation({ summary: 'Atualizar recurso (parcial)' })
  async patch(@Param('resourceId') resourceId: string, @Body() updateDto: any) {
    return this.resourcesService.patch(resourceId, updateDto);
  }

  @Delete(':resourceId')
  @ApiOperation({ summary: 'Deletar recurso' })
  async remove(@Param('resourceId') resourceId: string) {
    return this.resourcesService.remove(resourceId);
  }
}


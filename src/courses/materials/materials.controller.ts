import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MaterialsService } from './materials.service';

@ApiTags('Courses')
@Controller('courses/:courseId/materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar materiais de um curso' })
  async findAll(@Param('courseId') courseId: string, @Query('name') name?: string) {
    return this.materialsService.findAll(courseId, name);
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar material a um curso' })
  async create(@Param('courseId') courseId: string, @Body() createDto: any) {
    return this.materialsService.create(courseId, createDto);
  }

  @Get(':materialId')
  @ApiOperation({ summary: 'Buscar material específico' })
  async findOne(@Param('courseId') courseId: string, @Param('materialId') materialId: string) {
    return this.materialsService.findOne(courseId, materialId);
  }

  @Put(':materialId')
  @ApiOperation({ summary: 'Atualizar material (completo)' })
  async update(
    @Param('courseId') courseId: string,
    @Param('materialId') materialId: string,
    @Body() updateDto: any,
  ) {
    return this.materialsService.update(courseId, materialId, updateDto);
  }

  @Patch(':materialId')
  @ApiOperation({ summary: 'Atualizar material (parcial)' })
  async patch(
    @Param('courseId') courseId: string,
    @Param('materialId') materialId: string,
    @Body() updateDto: any,
  ) {
    return this.materialsService.patch(courseId, materialId, updateDto);
  }

  @Delete(':materialId')
  @ApiOperation({ summary: 'Deletar material' })
  async remove(@Param('courseId') courseId: string, @Param('materialId') materialId: string) {
    return this.materialsService.remove(courseId, materialId);
  }
}


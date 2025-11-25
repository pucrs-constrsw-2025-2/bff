import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ClassesService } from './classes.service';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar turmas' })
  async findAll(@Query() query: any) {
    return this.classesService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Criar turma' })
  async create(@Body() createDto: any) {
    return this.classesService.create(createDto);
  }

  @Get(':classId')
  @ApiOperation({ summary: 'Buscar turma por ID' })
  async findOne(@Param('classId') classId: string) {
    return this.classesService.findOne(classId);
  }

  @Put(':classId')
  @ApiOperation({ summary: 'Atualizar turma (completo)' })
  async update(@Param('classId') classId: string, @Body() updateDto: any) {
    return this.classesService.update(classId, updateDto);
  }

  @Patch(':classId')
  @ApiOperation({ summary: 'Atualizar turma (parcial - Dictionary)' })
  async patch(@Param('classId') classId: string, @Body() updateDto: any) {
    return this.classesService.patch(classId, updateDto);
  }

  @Delete(':classId')
  @ApiOperation({ summary: 'Deletar turma' })
  async remove(@Param('classId') classId: string) {
    return this.classesService.remove(classId);
  }
}


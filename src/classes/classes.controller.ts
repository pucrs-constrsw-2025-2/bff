import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
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

  @Get(':id')
  @ApiOperation({ summary: 'Buscar turma por ID' })
  async findOne(@Param('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar turma' })
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.classesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar turma' })
  async remove(@Param('id') id: string) {
    return this.classesService.remove(id);
  }
}


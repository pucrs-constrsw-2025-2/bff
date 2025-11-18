import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CoursesService } from './courses.service';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar disciplinas' })
  async findAll(@Query() query: any) {
    return this.coursesService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Criar disciplina' })
  async create(@Body() createDto: any) {
    return this.coursesService.create(createDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar disciplina por ID' })
  async findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar disciplina' })
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.coursesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar disciplina' })
  async remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}


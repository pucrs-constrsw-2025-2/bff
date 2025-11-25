import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
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

  @Get(':courseId')
  @ApiOperation({ summary: 'Buscar disciplina por ID' })
  async findOne(@Param('courseId') courseId: string) {
    return this.coursesService.findOne(courseId);
  }

  @Put(':courseId')
  @ApiOperation({ summary: 'Atualizar disciplina (completo)' })
  async update(@Param('courseId') courseId: string, @Body() updateDto: any) {
    return this.coursesService.update(courseId, updateDto);
  }

  @Patch(':courseId')
  @ApiOperation({ summary: 'Atualizar disciplina (parcial)' })
  async patch(@Param('courseId') courseId: string, @Body() updateDto: any) {
    return this.coursesService.patch(courseId, updateDto);
  }

  @Get(':courseId/classes')
  @ApiOperation({ summary: 'Buscar turmas de um curso' })
  async getCourseClasses(@Param('courseId') courseId: string, @Query() query: any) {
    return this.coursesService.getCourseClasses(courseId, query);
  }

  @Delete(':courseId')
  @ApiOperation({ summary: 'Deletar disciplina' })
  async remove(@Param('courseId') courseId: string) {
    return this.coursesService.remove(courseId);
  }
}


import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SubjectsService } from './subjects.service';

@ApiTags('Lessons')
@Controller('lessons/:lessonId/subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar assuntos de uma aula' })
  async findAll(@Param('lessonId') lessonId: string) {
    return this.subjectsService.findAll(lessonId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar assunto para uma aula' })
  async create(@Param('lessonId') lessonId: string, @Body() createDto: any) {
    return this.subjectsService.create(lessonId, createDto);
  }

  @Get(':subjectId')
  @ApiOperation({ summary: 'Buscar assunto específico' })
  async findOne(@Param('lessonId') lessonId: string, @Param('subjectId') subjectId: string) {
    return this.subjectsService.findOne(lessonId, subjectId);
  }

  @Put(':subjectId')
  @ApiOperation({ summary: 'Atualizar assunto (completo)' })
  async update(
    @Param('lessonId') lessonId: string,
    @Param('subjectId') subjectId: string,
    @Body() updateDto: any,
  ) {
    return this.subjectsService.update(lessonId, subjectId, updateDto);
  }

  @Patch(':subjectId')
  @ApiOperation({ summary: 'Atualizar assunto (parcial)' })
  async patch(
    @Param('lessonId') lessonId: string,
    @Param('subjectId') subjectId: string,
    @Body() updateDto: any,
  ) {
    return this.subjectsService.patch(lessonId, subjectId, updateDto);
  }

  @Delete(':subjectId')
  @ApiOperation({ summary: 'Deletar assunto' })
  async remove(@Param('lessonId') lessonId: string, @Param('subjectId') subjectId: string) {
    return this.subjectsService.remove(lessonId, subjectId);
  }
}


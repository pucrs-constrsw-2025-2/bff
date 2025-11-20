import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubjectsService } from './subjects.service';

@ApiTags('Lessons')
@Controller('lessons/:lessonId/subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar assunto para uma aula' })
  create(@Param('lessonId') lessonId: string, @Body() dto: any) {
    return this.subjectsService.create(lessonId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar assuntos de uma aula' })
  findAll(@Param('lessonId') lessonId: string) {
    return this.subjectsService.findAll(lessonId);
  }

  @Get(':subjectId')
  @ApiOperation({ summary: 'Buscar assunto por ID' })
  findOne(
    @Param('lessonId') lessonId: string,
    @Param('subjectId') subjectId: string,
  ) {
    return this.subjectsService.findOne(lessonId, subjectId);
  }

  @Put(':subjectId')
  @ApiOperation({ summary: 'Atualizar assunto (completo)' })
  updateFull(
    @Param('lessonId') lessonId: string,
    @Param('subjectId') subjectId: string,
    @Body() dto: any,
  ) {
    return this.subjectsService.updateFull(lessonId, subjectId, dto);
  }

  @Patch(':subjectId')
  @ApiOperation({ summary: 'Atualizar assunto (parcial)' })
  updatePartial(
    @Param('lessonId') lessonId: string,
    @Param('subjectId') subjectId: string,
    @Body() dto: any,
  ) {
    return this.subjectsService.updatePartial(lessonId, subjectId, dto);
  }

  @Delete(':subjectId')
  @ApiOperation({ summary: 'Remover assunto' })
  remove(
    @Param('lessonId') lessonId: string,
    @Param('subjectId') subjectId: string,
  ) {
    return this.subjectsService.remove(lessonId, subjectId);
  }
}

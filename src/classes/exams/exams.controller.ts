import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ExamsService } from './exams.service';

@ApiTags('Classes')
@Controller('classes/:classId/exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar provas da classe' })
  async findAll(@Param('classId') classId: string) {
    return this.examsService.findAll(classId);
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar prova à classe' })
  async create(@Param('classId') classId: string, @Body() createDto: any) {
    return this.examsService.create(classId, createDto);
  }

  @Get(':examId')
  @ApiOperation({ summary: 'Obter prova por ID' })
  async findOne(@Param('classId') classId: string, @Param('examId') examId: string) {
    return this.examsService.findOne(classId, examId);
  }

  @Put(':examId')
  @ApiOperation({ summary: 'Atualizar prova (completo)' })
  async update(
    @Param('classId') classId: string,
    @Param('examId') examId: string,
    @Body() updateDto: any,
  ) {
    return this.examsService.update(classId, examId, updateDto);
  }

  @Patch(':examId')
  @ApiOperation({ summary: 'Atualizar prova (parcial - Dictionary)' })
  async patch(
    @Param('classId') classId: string,
    @Param('examId') examId: string,
    @Body() updateDto: any,
  ) {
    return this.examsService.patch(classId, examId, updateDto);
  }

  @Delete(':examId')
  @ApiOperation({ summary: 'Excluir prova' })
  async remove(@Param('classId') classId: string, @Param('examId') examId: string) {
    return this.examsService.remove(classId, examId);
  }
}


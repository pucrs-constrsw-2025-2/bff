import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StudentsService } from './students.service';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar estudantes' })
  async findAll(@Query() query: any) {
    return this.studentsService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Criar estudante' })
  async create(@Body() createDto: any) {
    return this.studentsService.create(createDto);
  }

  @Get(':studentId')
  @ApiOperation({ summary: 'Buscar estudante por ID' })
  async findOne(@Param('studentId') studentId: string) {
    return this.studentsService.findOne(studentId);
  }

  @Put(':studentId')
  @ApiOperation({ summary: 'Atualizar estudante (completo)' })
  async update(@Param('studentId') studentId: string, @Body() updateDto: any) {
    return this.studentsService.update(studentId, updateDto);
  }

  @Patch(':studentId')
  @ApiOperation({ summary: 'Atualizar estudante (parcial - JSON Patch)' })
  async patch(@Param('studentId') studentId: string, @Body() patchDto: any) {
    return this.studentsService.patch(studentId, patchDto);
  }

  @Delete(':studentId')
  @ApiOperation({ summary: 'Deletar estudante' })
  async remove(@Param('studentId') studentId: string) {
    return this.studentsService.remove(studentId);
  }
}


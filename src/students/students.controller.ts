import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
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

  @Get(':id')
  @ApiOperation({ summary: 'Buscar estudante por ID' })
  async findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar estudante' })
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.studentsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar estudante' })
  async remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}


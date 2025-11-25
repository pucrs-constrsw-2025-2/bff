import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LessonsService } from './lessons.service';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar aulas' })
  async findAll() {
    return this.lessonsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Criar aula' })
  async create(@Body() createDto: any) {
    return this.lessonsService.create(createDto);
  }

  @Get(':lessonId')
  @ApiOperation({ summary: 'Buscar aula por ID' })
  async findOne(@Param('lessonId') lessonId: string) {
    return this.lessonsService.findOne(lessonId);
  }

  @Put(':lessonId')
  @ApiOperation({ summary: 'Atualizar aula (completo)' })
  async update(@Param('lessonId') lessonId: string, @Body() updateDto: any) {
    return this.lessonsService.update(lessonId, updateDto);
  }

  @Patch(':lessonId')
  @ApiOperation({ summary: 'Atualizar aula (parcial)' })
  async patch(@Param('lessonId') lessonId: string, @Body() updateDto: any) {
    return this.lessonsService.patch(lessonId, updateDto);
  }

  @Delete(':lessonId')
  @ApiOperation({ summary: 'Deletar aula' })
  async remove(@Param('lessonId') lessonId: string) {
    return this.lessonsService.remove(lessonId);
  }
}


import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProfessorsClassesService } from './classes.service';

@ApiTags('Professors')
@Controller('professors/:professorId/classes')
export class ProfessorsClassesController {
  constructor(private readonly professorsClassesService: ProfessorsClassesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar classes de um professor' })
  async findAll(@Param('professorId') professorId: string) {
    return this.professorsClassesService.findAll(professorId);
  }

  @Post()
  @ApiOperation({ summary: 'Associar professor a uma classe' })
  async create(@Param('professorId') professorId: string, @Body() body: { classId: string }) {
    return this.professorsClassesService.create(professorId, body.classId);
  }

  @Delete(':classId')
  @ApiOperation({ summary: 'Desassociar professor de uma classe' })
  async remove(@Param('professorId') professorId: string, @Param('classId') classId: string) {
    return this.professorsClassesService.remove(professorId, classId);
  }
}


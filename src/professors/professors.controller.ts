import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProfessorsService } from './professors.service';

@ApiTags('Professors')
@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar professores' })
  async findAll(@Query() query: any) {
    return this.professorsService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Criar professor' })
  async create(@Body() createDto: any) {
    return this.professorsService.create(createDto);
  }

  @Get(':professorId')
  @ApiOperation({ summary: 'Buscar professor por ID' })
  async findOne(@Param('professorId') professorId: string) {
    return this.professorsService.findOne(professorId);
  }

  @Put(':professorId')
  @ApiOperation({ summary: 'Atualizar professor (completo)' })
  async update(@Param('professorId') professorId: string, @Body() updateDto: any) {
    return this.professorsService.update(professorId, updateDto);
  }

  @Delete(':professorId')
  @ApiOperation({ summary: 'Deletar professor' })
  async remove(@Param('professorId') professorId: string) {
    return this.professorsService.remove(professorId);
  }
}


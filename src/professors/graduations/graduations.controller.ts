import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GraduationsService } from './graduations.service';

@ApiTags('Professors')
@Controller('professors/:professorId/graduations')
export class GraduationsController {
  constructor(private readonly graduationsService: GraduationsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar graduações de um professor' })
  async findAll(@Param('professorId') professorId: string) {
    return this.graduationsService.findAll(professorId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar graduação para um professor' })
  async create(@Param('professorId') professorId: string, @Body() createDto: any) {
    return this.graduationsService.create(professorId, createDto);
  }

  @Put(':graduationId')
  @ApiOperation({ summary: 'Atualizar graduação' })
  async update(
    @Param('professorId') professorId: string,
    @Param('graduationId') graduationId: string,
    @Body() updateDto: any,
  ) {
    return this.graduationsService.update(professorId, graduationId, updateDto);
  }

  @Delete(':graduationId')
  @ApiOperation({ summary: 'Excluir graduação' })
  async remove(
    @Param('professorId') professorId: string,
    @Param('graduationId') graduationId: string,
  ) {
    return this.graduationsService.remove(professorId, graduationId);
  }
}


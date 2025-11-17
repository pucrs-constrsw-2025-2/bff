import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
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
    // O 'createDto' aqui deve ser o DTO do BFF (definido no openapi.yaml)
    // Ex: { name, email, document, status }
    return this.professorsService.create(createDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar professor por ID' })
  async findOne(@Param('id') id: string) {
    return this.professorsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar professor' })
  async update(@Param('id') id: string, @Body() updateDto: any) {
    // O 'updateDto' aqui é o DTO do BFF
    return this.professorsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar professor' })
  async remove(@Param('id') id: string) {
    return this.professorsService.remove(id);
  }

  // --- Endpoints de Graduações (Aninhados) ---

  @Get(':id/graduations')
  @ApiOperation({ summary: 'Listar graduações de um professor' })
  async findGraduations(@Param('id') id: string) {
    return this.professorsService.findGraduations(id);
  }

  @Post(':id/graduations')
  @ApiOperation({ summary: 'Criar graduação para um professor' })
  async createGraduation(@Param('id') id: string, @Body() createDto: any) {
    // O DTO 'createDto' deve ser definido no BFF, ex: CreateGraduationDto
    return this.professorsService.createGraduation(id, createDto);
  }

  @Put(':id/graduations/:graduationId')
  @ApiOperation({ summary: 'Atualizar graduação de um professor' })
  async updateGraduation(
    @Param('id') id: string,
    @Param('graduationId') graduationId: string,
    @Body() updateDto: any,
  ) {
    // O DTO 'updateDto' deve ser definido no BFF, ex: UpdateGraduationDto
    return this.professorsService.updateGraduation(id, graduationId, updateDto);
  }

  @Delete(':id/graduations/:graduationId')
  @ApiOperation({ summary: 'Deletar graduação de um professor' })
  async deleteGraduation(
    @Param('id') id: string,
    @Param('graduationId') graduationId: string,
  ) {
    return this.professorsService.deleteGraduation(id, graduationId);
  }
}
import { Controller, Get, Post, Put, Delete, Param, Body, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProfessorsService } from './professors.service';

@ApiTags('Professors')
@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar professores' })
  async findAll(@Query() query: any, @Req() req: any) {
    const token = req.headers['authorization'];
    return this.professorsService.findAll(query, token);
  }

  @Post()
  @ApiOperation({ summary: 'Criar professor' })
  async create(@Body() createDto: any, @Req() req: any) {
    const token = req.headers['authorization'];
    return this.professorsService.create(createDto, token);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar professor por ID' })
  async findOne(@Param('id') id: string, @Req() req: any) {
    const token = req.headers['authorization'];
    return this.professorsService.findOne(id, token);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar professor' })
  async update(@Param('id') id: string, @Body() updateDto: any, @Req() req: any) {
    const token = req.headers['authorization'];
    return this.professorsService.update(id, updateDto, token);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar professor' })
  async remove(@Param('id') id: string, @Req() req: any) {
    const token = req.headers['authorization'];
    return this.professorsService.remove(id, token);
  }

  // --- Endpoints de Graduações (Aninhados) ---

  @Get(':id/graduations')
  @ApiOperation({ summary: 'Listar graduações de um professor' })
  async findGraduations(@Param('id') id: string, @Req() req: any) {
    const token = req.headers['authorization'];
    return this.professorsService.findGraduations(id, token);
  }

  @Post(':id/graduations')
  @ApiOperation({ summary: 'Criar graduação para um professor' })
  async createGraduation(@Param('id') id: string, @Body() createDto: any, @Req() req: any) {
    const token = req.headers['authorization'];
    return this.professorsService.createGraduation(id, createDto, token);
  }

  @Put(':id/graduations/:graduationId')
  @ApiOperation({ summary: 'Atualizar graduação de um professor' })
  async updateGraduation(
    @Param('id') id: string,
    @Param('graduationId') graduationId: string,
    @Body() updateDto: any,
    @Req() req: any,
  ) {
    const token = req.headers['authorization'];
    return this.professorsService.updateGraduation(id, graduationId, updateDto, token);
  }

  @Delete(':id/graduations/:graduationId')
  @ApiOperation({ summary: 'Deletar graduação de um professor' })
  async deleteGraduation(
    @Param('id') id: string,
    @Param('graduationId') graduationId: string,
    @Req() req: any,
  ) {
    const token = req.headers['authorization'];
    return this.professorsService.deleteGraduation(id, graduationId, token);
  }
}
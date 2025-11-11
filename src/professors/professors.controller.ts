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
    return this.professorsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar professor' })
  async remove(@Param('id') id: string) {
    return this.professorsService.remove(id);
  }
}


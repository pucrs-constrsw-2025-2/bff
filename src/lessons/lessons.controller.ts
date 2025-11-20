import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
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

  @Get(':id')
  @ApiOperation({ summary: 'Buscar aula por ID' })
  async findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar aula' })
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.lessonsService.update(id, updateDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar aula (parcial)' })
  async updatePartial(@Param('id') id: string, @Body() updateDto: any) {
    return this.lessonsService.updatePartial(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar aula' })
  async remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}


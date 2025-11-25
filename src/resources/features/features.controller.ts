import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FeaturesService } from './features.service';

@ApiTags('Resources')
@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as features' })
  async findAll(@Query('categoryId') categoryId?: string) {
    return this.featuresService.findAll(categoryId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova feature' })
  async create(@Body() createDto: any) {
    return this.featuresService.create(createDto);
  }

  @Get(':featureId')
  @ApiOperation({ summary: 'Buscar feature por ID' })
  async findOne(@Param('featureId') featureId: string) {
    return this.featuresService.findOne(featureId);
  }

  @Put(':featureId')
  @ApiOperation({ summary: 'Substituir feature (completo)' })
  async update(@Param('featureId') featureId: string, @Body() updateDto: any) {
    return this.featuresService.update(featureId, updateDto);
  }

  @Patch(':featureId')
  @ApiOperation({ summary: 'Atualizar feature (parcial)' })
  async patch(@Param('featureId') featureId: string, @Body() updateDto: any) {
    return this.featuresService.patch(featureId, updateDto);
  }

  @Delete(':featureId')
  @ApiOperation({ summary: 'Deletar feature' })
  async remove(@Param('featureId') featureId: string) {
    return this.featuresService.remove(featureId);
  }
}


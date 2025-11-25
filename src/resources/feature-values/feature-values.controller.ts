import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FeatureValuesService } from './feature-values.service';

@ApiTags('Resources')
@Controller('feature-values')
export class FeatureValuesController {
  constructor(private readonly featureValuesService: FeatureValuesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os feature values' })
  async findAll() {
    return this.featureValuesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo feature value' })
  async create(@Body() createDto: any) {
    return this.featureValuesService.create(createDto);
  }

  @Get(':featureValueId')
  @ApiOperation({ summary: 'Buscar feature value por ID' })
  async findOne(@Param('featureValueId') featureValueId: string) {
    return this.featureValuesService.findOne(featureValueId);
  }

  @Patch(':featureValueId')
  @ApiOperation({ summary: 'Atualizar feature value (parcial)' })
  async patch(@Param('featureValueId') featureValueId: string, @Body() updateDto: any) {
    return this.featureValuesService.patch(featureValueId, updateDto);
  }

  @Delete(':featureValueId')
  @ApiOperation({ summary: 'Deletar feature value' })
  async remove(@Param('featureValueId') featureValueId: string) {
    return this.featureValuesService.remove(featureValueId);
  }
}


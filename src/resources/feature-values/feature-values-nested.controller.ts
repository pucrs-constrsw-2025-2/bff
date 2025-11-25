import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FeatureValuesService } from './feature-values.service';

@ApiTags('Resources')
@Controller('feature-values')
export class FeatureValuesNestedController {
  constructor(private readonly featureValuesService: FeatureValuesService) {}

  @Get('resource/:resourceId')
  @ApiOperation({ summary: 'Buscar feature values por recurso' })
  async getFeatureValuesByResource(@Param('resourceId') resourceId: string) {
    return this.featureValuesService.getFeatureValuesByResource(resourceId);
  }

  @Get('feature/:featureId')
  @ApiOperation({ summary: 'Buscar feature values por feature' })
  async getFeatureValuesByFeature(@Param('featureId') featureId: string) {
    return this.featureValuesService.getFeatureValuesByFeature(featureId);
  }

  @Get('resources/:resourceId/features')
  @ApiOperation({ summary: 'Listar feature values de um recurso' })
  async listResourceFeatureValues(@Param('resourceId') resourceId: string) {
    return this.featureValuesService.listResourceFeatureValues(resourceId);
  }

  @Post('resources/:resourceId/features')
  @ApiOperation({ summary: 'Criar feature value para um recurso' })
  async createResourceFeatureValue(@Param('resourceId') resourceId: string, @Body() createDto: any) {
    return this.featureValuesService.createResourceFeatureValue(resourceId, createDto);
  }

  @Get('resources/:resourceId/features/:featureValueId')
  @ApiOperation({ summary: 'Buscar feature value específico' })
  async getResourceFeatureValue(
    @Param('resourceId') resourceId: string,
    @Param('featureValueId') featureValueId: string,
  ) {
    return this.featureValuesService.getResourceFeatureValue(resourceId, featureValueId);
  }

  @Patch('resources/:resourceId/features/:featureValueId')
  @ApiOperation({ summary: 'Atualizar feature value' })
  async patchResourceFeatureValue(
    @Param('resourceId') resourceId: string,
    @Param('featureValueId') featureValueId: string,
    @Body() updateDto: any,
  ) {
    return this.featureValuesService.patchResourceFeatureValue(resourceId, featureValueId, updateDto);
  }

  @Delete('resources/:resourceId/features/:featureValueId')
  @ApiOperation({ summary: 'Deletar feature value' })
  async deleteResourceFeatureValue(
    @Param('resourceId') resourceId: string,
    @Param('featureValueId') featureValueId: string,
  ) {
    return this.featureValuesService.deleteResourceFeatureValue(resourceId, featureValueId);
  }
}


import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FeaturesService } from './features.service';

@ApiTags('Resources')
@Controller('resources/features/category/:categoryId')
export class FeaturesCategoryController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar features por categoria' })
  async getFeaturesByCategory(@Param('categoryId') categoryId: string) {
    return this.featuresService.getFeaturesByCategory(categoryId);
  }
}


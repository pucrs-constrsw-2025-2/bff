import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';

@ApiTags('Resources')
@Controller('categories/:categoryId')
export class CategoriesNestedController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('resources')
  @ApiOperation({ summary: 'Listar recursos de uma categoria' })
  async getCategoryResources(@Param('categoryId') categoryId: string) {
    return this.categoriesService.getCategoryResources(categoryId);
  }

  @Post('resources')
  @ApiOperation({ summary: 'Criar recurso em uma categoria' })
  async createCategoryResource(@Param('categoryId') categoryId: string, @Body() createDto: any) {
    return this.categoriesService.createCategoryResource(categoryId, createDto);
  }

  @Get('features')
  @ApiOperation({ summary: 'Listar features de uma categoria' })
  async getCategoryFeatures(@Param('categoryId') categoryId: string) {
    return this.categoriesService.getCategoryFeatures(categoryId);
  }

  @Post('features')
  @ApiOperation({ summary: 'Criar feature em uma categoria' })
  async createCategoryFeature(@Param('categoryId') categoryId: string, @Body() createDto: any) {
    return this.categoriesService.createCategoryFeature(categoryId, createDto);
  }
}


import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ResourcesService } from './resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.resourcesService.findAll(query);
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string) {
    return this.resourcesService.findAll({ categoryId });
  }

  @Post()
  async create(@Body() createDto: any) {
    return this.resourcesService.create(createDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    return this.resourcesService.update(id, updateDto);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() partialDto: any) {
    return this.resourcesService.patch(id, partialDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }

  // Feature values endpoints
  @Post(':resourceId/features')
  async createFeature(@Param('resourceId') resourceId: string, @Body() createDto: any) {
    return this.resourcesService.createFeature(resourceId, createDto);
  }

  @Get(':resourceId/features')
  async findFeatures(@Param('resourceId') resourceId: string, @Query() query: any) {
    return this.resourcesService.findFeatures(resourceId, query);
  }

  @Get(':resourceId/features/:featureValueId')
  async findFeature(
    @Param('resourceId') resourceId: string,
    @Param('featureValueId') featureValueId: string,
  ) {
    return this.resourcesService.findFeature(resourceId, featureValueId);
  }

  @Put(':resourceId/features/:featureValueId')
  async updateFeature(
    @Param('resourceId') resourceId: string,
    @Param('featureValueId') featureValueId: string,
    @Body() updateDto: any,
  ) {
    return this.resourcesService.updateFeature(resourceId, featureValueId, updateDto);
  }

  @Patch(':resourceId/features/:featureValueId')
  async patchFeature(
    @Param('resourceId') resourceId: string,
    @Param('featureValueId') featureValueId: string,
    @Body() partialDto: any,
  ) {
    return this.resourcesService.patchFeature(resourceId, featureValueId, partialDto);
  }

  @Delete(':resourceId/features/:featureValueId')
  async removeFeature(
    @Param('resourceId') resourceId: string,
    @Param('featureValueId') featureValueId: string,
  ) {
    return this.resourcesService.removeFeature(resourceId, featureValueId);
  }
}


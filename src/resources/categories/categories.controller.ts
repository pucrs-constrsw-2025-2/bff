import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';

@ApiTags('Resources')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as categorias' })
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova categoria' })
  async create(@Body() createDto: any) {
    return this.categoriesService.create(createDto);
  }

  @Get(':categoryId')
  @ApiOperation({ summary: 'Buscar categoria por ID' })
  async findOne(@Param('categoryId') categoryId: string) {
    return this.categoriesService.findOne(categoryId);
  }

  @Put(':categoryId')
  @ApiOperation({ summary: 'Substituir categoria (completo)' })
  async update(@Param('categoryId') categoryId: string, @Body() updateDto: any) {
    return this.categoriesService.update(categoryId, updateDto);
  }

  @Patch(':categoryId')
  @ApiOperation({ summary: 'Atualizar categoria (parcial)' })
  async patch(@Param('categoryId') categoryId: string, @Body() updateDto: any) {
    return this.categoriesService.patch(categoryId, updateDto);
  }

  @Delete(':categoryId')
  @ApiOperation({ summary: 'Deletar categoria' })
  async remove(@Param('categoryId') categoryId: string) {
    return this.categoriesService.remove(categoryId);
  }
}


import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ValueTypesService } from './value-types.service';

@ApiTags('Resources')
@Controller('resources/value-types')
export class ValueTypesController {
  constructor(private readonly valueTypesService: ValueTypesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar tipos de valores disponíveis (enum)' })
  async findAll() {
    return this.valueTypesService.findAll();
  }
}


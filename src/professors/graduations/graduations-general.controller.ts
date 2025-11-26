import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GraduationsService } from './graduations.service';

@ApiTags('Professors')
@Controller('professors/graduations')
export class GraduationsGeneralController {
  constructor(private readonly graduationsService: GraduationsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as graduações do sistema' })
  async findAll() {
    return this.graduationsService.findAllGeneral();
  }
}


import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Root endpoint' })
  getRoot() {
    return {
      name: 'ConstrSW BFF API',
      version: '1.0.0',
      description: 'Backend for Frontend REST API',
      documentation: '/api/docs',
    };
  }
}


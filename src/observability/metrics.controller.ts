import { Controller, Get, Header } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Health')
@Controller('metrics')
export class MetricsController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Get()
  @Header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
  @ApiOperation({ summary: 'Expor métricas Prometheus do BFF' })
  @ApiResponse({
    status: 200,
    description: 'Métricas em formato Prometheus',
  })
  async getMetrics(): Promise<string> {
    const port = this.configService.get<number>('METRICS_PORT', 9464);
    const url = `http://localhost:${port}/metrics`;

    const response = await this.httpService.axiosRef.get<string>(url, {
      responseType: 'text',
    });

    return response.data;
  }
}



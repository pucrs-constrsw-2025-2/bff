import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheckResult,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  async checkAll(): Promise<HealthCheckResult> {
    // Simple healthcheck - just return that BFF is up
    // This ensures the healthcheck always returns 200 if BFF is running
    return {
      status: 'ok',
      info: {
        bff: {
          status: 'up',
          timestamp: new Date().toISOString(),
        },
      },
      error: {},
      details: {
        bff: {
          status: 'up',
          timestamp: new Date().toISOString(),
        },
      },
    };
  }
}


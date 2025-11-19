import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CircuitBreaker = require('opossum');
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface CircuitBreakerOptions {
  timeout?: number;
  errorThresholdPercentage?: number;
  resetTimeout?: number;
  name?: string;
}

@Injectable()
export class CircuitBreakerService {
  private breakers: Map<string, CircuitBreaker> = new Map();

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  createCircuitBreaker(
    serviceName: string,
    options?: CircuitBreakerOptions,
  ): CircuitBreaker {
    if (this.breakers.has(serviceName)) {
      return this.breakers.get(serviceName)!;
    }

    const defaultOptions = {
      timeout:
        options?.timeout ||
        this.configService.get<number>('circuitBreaker.timeout', 3000),
      errorThresholdPercentage:
        options?.errorThresholdPercentage ||
        this.configService.get<number>(
          'circuitBreaker.errorThresholdPercentage',
          50,
        ),
      resetTimeout:
        options?.resetTimeout ||
        this.configService.get<number>(
          'circuitBreaker.resetTimeout',
          30000,
        ),
    };

    const breaker = new CircuitBreaker(
      async (url: string, config: any) => {
        const response = await firstValueFrom(
          this.httpService.request({
            url,
            ...config,
          }),
        );
        return (response as any).data;
      },
      {
        ...defaultOptions,
        name: options?.name || serviceName,
      },
    );

    // Event handlers
    breaker.on('open', () => {
      console.warn(`Circuit breaker ${serviceName} opened`);
    });

    breaker.on('halfOpen', () => {
      console.log(`Circuit breaker ${serviceName} half-open`);
    });

    breaker.on('close', () => {
      console.log(`Circuit breaker ${serviceName} closed`);
    });

    this.breakers.set(serviceName, breaker);
    return breaker;
  }

  getCircuitBreaker(serviceName: string): CircuitBreaker | undefined {
    return this.breakers.get(serviceName);
  }
}


import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import type CircuitBreaker from 'opossum';

// Use require to avoid ES module import issues with opossum
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const opossumModule = require('opossum');
const CircuitBreakerConstructor: typeof CircuitBreaker = opossumModule.default || opossumModule;

export interface CircuitBreakerOptions {
  timeout?: number;
  errorThresholdPercentage?: number;
  resetTimeout?: number;
  name?: string;
}

@Injectable()
export class CircuitBreakerService {
  private readonly logger = new Logger(CircuitBreakerService.name);
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

    const breaker = new CircuitBreakerConstructor(
      async (url: string, config: any) => {
        try {
          const response = await firstValueFrom(
            this.httpService.request({
              url,
              ...config,
            }),
          );
          return (response as any).data;
        } catch (error) {
          // Se for um AxiosError, converte para HttpException para propagação correta
          if (error instanceof AxiosError) {
            const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
            const message = error.response?.data?.detail || 
                           error.response?.data?.message || 
                           error.message || 
                           'Internal server error';
            
            throw new HttpException(
              {
                message,
                statusCode: status,
                error: error.response?.data?.error || HttpStatus[status],
              },
              status,
            );
          }
          throw error;
        }
      },
      {
        ...defaultOptions,
        name: options?.name || serviceName,
        // Só conta como erro do circuit breaker: 5xx, timeouts e erros de rede
        // Não conta 4xx (401, 403, etc.) como falhas do serviço
        isOurError: (error: any) => {
          // Se for HttpException, verifica o status code
          if (error?.statusCode) {
            const status = error.statusCode;
            // Só conta 5xx e 408 (timeout) como erros do serviço
            // 4xx (401, 403, 404, etc.) são erros do cliente, não do serviço
            return status >= 500 || status === 408;
          }
          // Erros de rede, timeouts e outros erros técnicos sempre contam
          return true;
        },
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


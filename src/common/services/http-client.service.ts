import { Injectable, Logger, Inject, Scope, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { CircuitBreakerService } from '../circuit-breaker/circuit-breaker.service';

@Injectable({ scope: Scope.REQUEST })
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly circuitBreakerService: CircuitBreakerService,
    @Inject(REQUEST) private readonly expressRequest: Request,
  ) {}

  async request<T>(
    serviceName: string,
    config: AxiosRequestConfig,
    options?: {
      useCircuitBreaker?: boolean;
      timeout?: number;
    },
  ): Promise<T> {
    const serviceConfig = this.configService.get(`services.${serviceName}`);
    const baseUrl = serviceConfig?.baseUrl || '';
    const defaultTimeout = serviceConfig?.timeout || 5000;
    const requestTimeout = options?.timeout || defaultTimeout;

    const url = config.url?.startsWith('http')
      ? config.url
      : `${baseUrl}${config.url || ''}`;

    // Extract Authorization header from the original request
    // Express normalizes headers to lowercase, and they can be string or string[]
    const authHeader = this.expressRequest?.headers?.authorization;
    const authorizationHeader = Array.isArray(authHeader) 
      ? authHeader[0] 
      : authHeader;
    
    const requestConfig: AxiosRequestConfig = {
      ...config,
      url,
      timeout: requestTimeout,
      headers: {
        'Content-Type': 'application/json',
        ...(authorizationHeader && { Authorization: authorizationHeader }),
        ...config.headers,
      },
    };

    try {
      if (options?.useCircuitBreaker !== false) {
        const breaker = this.circuitBreakerService.createCircuitBreaker(
          serviceName,
        );

        return await breaker.fire(url, requestConfig);
      }

      const response = await firstValueFrom(
        this.httpService.request<T>(requestConfig).pipe(
          timeout(requestTimeout),
          catchError((error: AxiosError) => {
            this.logger.error({
              message: 'HTTP request failed',
              service: serviceName,
              url,
              status: error.response?.status,
              statusText: error.response?.statusText,
            });
            throw error;
          }),
        ),
      );

      return (response as any).data as T;
    } catch (error: any) {
      // Erros vindos diretamente do Axios
      if (error instanceof AxiosError) {
        const status =
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          error.message ||
          'Internal server error';

        this.logger.error({
          message: 'HTTP request failed',
          service: serviceName,
          url,
          status,
          statusText: error.response?.statusText,
          error: message,
        });

        throw new HttpException(
          {
            message,
            statusCode: status,
            error: error.response?.data?.error || HttpStatus[status],
          },
          status,
        );
      }

      // Erros do circuit breaker (por exemplo, \"Breaker is open\")
      if (
        typeof error?.message === 'string' &&
        (error.message.includes('Breaker is open') ||
          error.code === 'EOPENBREAKER')
      ) {
        const message =
          'Serviço externo indisponível no momento (circuit breaker aberto).';

        this.logger.error({
          message: 'Circuit breaker open',
          service: serviceName,
          url,
          error: error.message,
        });

        throw new HttpException(
          {
            message,
            statusCode: HttpStatus.SERVICE_UNAVAILABLE,
            error: 'Service Unavailable',
          },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      // Qualquer outro erro é propagado
      throw error;
    }
  }

  async get<T>(
    serviceName: string,
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>(serviceName, { ...config, method: 'GET', url });
  }

  async post<T>(
    serviceName: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>(serviceName, {
      ...config,
      method: 'POST',
      url,
      data,
    });
  }

  async put<T>(
    serviceName: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>(serviceName, {
      ...config,
      method: 'PUT',
      url,
      data,
    });
  }

  async patch<T>(
    serviceName: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>(serviceName, {
      ...config,
      method: 'PATCH',
      url,
      data,
    });
  }

  async delete<T>(
    serviceName: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>(serviceName, {
      ...config,
      method: 'DELETE',
      url,
      data,
    });
  }
}


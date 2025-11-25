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
    } catch (error) {
      if (error instanceof AxiosError) {
        // Converte AxiosError em HttpException do NestJS
        const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error.response?.data?.detail || 
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


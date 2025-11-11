import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { CircuitBreakerService } from '../circuit-breaker/circuit-breaker.service';

@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly circuitBreakerService: CircuitBreakerService,
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

    const requestConfig: AxiosRequestConfig = {
      ...config,
      url,
      timeout: requestTimeout,
      headers: {
        'Content-Type': 'application/json',
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
        throw error;
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
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>(serviceName, {
      ...config,
      method: 'DELETE',
      url,
    });
  }
}


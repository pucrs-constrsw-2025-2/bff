import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

export interface Response<T> {
  data: T;
  meta?: {
    timestamp: string;
    requestId: string;
    version?: string;
  };
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const requestId = request.headers['x-request-id'] as string;

    return next.handle().pipe(
      map((data) => {
        // Skip transformation for health checks and certain endpoints
        if (
          request.url.includes('/health') ||
          request.url.includes('/metrics') ||
          data?.meta
        ) {
          return data;
        }

        return {
          data,
          meta: {
            timestamp: new Date().toISOString(),
            requestId,
            version: '1.0',
          },
        };
      }),
    );
  }
}


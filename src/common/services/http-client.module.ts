import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpClientService } from './http-client.service';
import { CircuitBreakerModule } from '../circuit-breaker/circuit-breaker.module';

@Global()
@Module({
  imports: [HttpModule, CircuitBreakerModule],
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class HttpClientModule {}


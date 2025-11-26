import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ObservabilityService } from './observability.service';
import { MetricsController } from './metrics.controller';

@Global()
@Module({
  imports: [HttpModule],
  controllers: [MetricsController],
  providers: [ObservabilityService],
  exports: [ObservabilityService],
})
export class ObservabilityModule {}


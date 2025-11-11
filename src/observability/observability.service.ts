import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

@Injectable()
export class ObservabilityService implements OnModuleInit {
  private sdk: NodeSDK;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const serviceName =
      this.configService.get<string>('OTEL_SERVICE_NAME') || 'bff';
    const serviceVersion =
      this.configService.get<string>('OTEL_SERVICE_VERSION') || '1.0.0';

    const resource = new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      [SemanticResourceAttributes.SERVICE_VERSION]: serviceVersion,
    });

    // Prometheus metrics exporter
    const metricsExporter = new PrometheusExporter({
      port: this.configService.get<number>('METRICS_PORT', 9464),
    });

    this.sdk = new NodeSDK({
      resource,
      traceExporter: undefined, // Configure trace exporter if needed
      metricReader: metricsExporter,
      instrumentations: [
        new HttpInstrumentation(),
        new NestInstrumentation(),
      ],
    });

    this.sdk.start();
    console.log('OpenTelemetry SDK initialized');
  }

  onModuleDestroy() {
    this.sdk?.shutdown();
  }
}


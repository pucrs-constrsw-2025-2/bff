import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync } from 'fs';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';
import { RequestTimeoutInterceptor } from './common/interceptors/request-timeout.interceptor';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);

  // Security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Permite scripts customizados do Swagger
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );

  // Cookie parser
  app.use(cookieParser());

  // CORS configuration
  app.enableCors({
    origin: configService.get<string>('corsOrigin', 'http://localhost:3000'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Request-ID',
      'X-Request-Timeout',
      'Idempotency-Key',
      'Accept',
    ],
    exposedHeaders: [
      'X-Request-ID',
      'X-RateLimit-Limit',
      'X-RateLimit-Remaining',
      'X-RateLimit-Reset',
      'Retry-After',
      'ETag',
      'Last-Modified',
    ],
  });

  // Servir arquivo JavaScript customizado para auto-configuração do token
  // Configurar ANTES do prefixo global para evitar problemas de roteamento
  const distPath = join(process.cwd(), 'dist', 'swagger');
  const srcPath = join(process.cwd(), 'src', 'swagger');
  const swaggerAssetsPath = existsSync(distPath) ? distPath : srcPath;
  
  if (existsSync(swaggerAssetsPath)) {
    console.log(`📁 Servindo assets do Swagger de: ${swaggerAssetsPath}`);
    // Configurar assets estáticos sem prefixo para evitar conflitos
    app.useStaticAssets(swaggerAssetsPath, {
      prefix: '/swagger-assets/',
    });
  } else {
    console.warn(`⚠️ Pasta de assets do Swagger não encontrada: ${swaggerAssetsPath}`);
  }

  // Swagger documentation (configurado ANTES do prefixo global, como nos outros serviços)
  if (configService.get<string>('ENABLE_SWAGGER', 'true') === 'true') {
    console.log("Swagger enabled");
    const config = new DocumentBuilder()
      .setTitle('ConstrSW BFF API')
      .setDescription('Backend for Frontend REST API')
      .setVersion('1.0.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token',
        },
        'bearer',
      )
      .addServer('http://localhost:8080/api/v1', 'Development')
      .addServer('http://api:3000/api/v1', 'Docker Internal')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    
    // Configurar Swagger: usar caminho completo e excluir do prefixo global
    // O Swagger será acessível em /api/v1/docs (sem duplicação do prefixo)
    SwaggerModule.setup('api/v1/docs', app, document, {
      customJs: '/swagger-assets/swagger-auth.js',
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
        onComplete: function() {
          console.log('✅ Swagger UI carregado completamente');
        }
      },
    });
  } else {
    console.log("Swagger disabled");
  }

  // Global prefix
  app.setGlobalPrefix('api');

  // API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      disableErrorMessages: false,
      validationError: {
        target: false,
        value: false,
      },
    }),
  );

  // Global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptors
  app.useGlobalInterceptors(
    new RequestTimeoutInterceptor(configService),
    new ResponseTransformInterceptor(),
    new LoggingInterceptor(),
  );

  const port = configService.get<number>('port', 3000);
  await app.listen(port);

  console.log(`🚀 BFF API is running on: http://localhost:${port}/api/v1`);
  if (configService.get<string>('enableSwagger', 'true') === 'true') {
    console.log(`📚 Swagger docs available at: http://localhost:${port}/api/v1/docs`);
  }
}

bootstrap();


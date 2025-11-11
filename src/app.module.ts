import {
  Module,
  MiddlewareConsumer,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
// Redis store will be configured if REDIS_HOST is available
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { EmployeesModule } from './employees/employees.module';
import { StudentsModule } from './students/students.module';
import { ProfessorsModule } from './professors/professors.module';
import { CoursesModule } from './courses/courses.module';
import { ClassesModule } from './classes/classes.module';
import { LessonsModule } from './lessons/lessons.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ResourcesModule } from './resources/resources.module';
import { RoomsModule } from './rooms/rooms.module';
import { HealthModule } from './health/health.module';
import { ObservabilityModule } from './observability/observability.module';
import { CircuitBreakerModule } from './common/circuit-breaker/circuit-breaker.module';
import configuration from './config/configuration';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.local', '.env'],
    }),

    // Cache
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisHost = configService.get<string>('REDIS_HOST');
        const redisPort = configService.get<number>('REDIS_PORT', 6379);

        if (redisHost) {
          // For Redis, you would need to install cache-manager-redis-yet
          // For now, using in-memory cache
          // return {
          //   store: require('cache-manager-redis-yet'),
          //   socket: {
          //     host: redisHost,
          //     port: redisPort,
          //   },
          //   ttl: configService.get<number>('CACHE_TTL', 300),
          // };
        }

        // In-memory cache fallback
        return {
          ttl: configService.get<number>('cache.ttl', 300),
          max: configService.get<number>('cache.max', 100),
        };
      },
      inject: [ConfigService],
    }),

    // Rate limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        throttlers: [
          {
            ttl: configService.get<number>('throttle.ttl', 60) * 1000, // Convert to milliseconds
            limit: configService.get<number>('throttle.limit', 100),
          },
        ],
      }),
      inject: [ConfigService],
    }),

    // HTTP client
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        timeout: configService.get<number>('http.timeout', 5000),
        maxRedirects: 3,
      }),
      inject: [ConfigService],
    }),

    // Observability
    ObservabilityModule,

    // Circuit breaker
    CircuitBreakerModule,

    // Health checks
    TerminusModule,
    HealthModule,

    // Feature modules
    AuthModule,
    UsersModule,
    RolesModule,
    EmployeesModule,
    StudentsModule,
    ProfessorsModule,
    CoursesModule,
    ClassesModule,
    LessonsModule,
    ReservationsModule,
    ResourcesModule,
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}


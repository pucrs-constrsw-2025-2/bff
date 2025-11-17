import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { HttpClientModule } from '../common/services/http-client.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [HttpClientModule, UsersModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}


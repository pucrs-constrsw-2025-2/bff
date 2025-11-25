import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { AuthorizedUsersController } from './authorized-users/authorized-users.controller';
import { AuthorizedUsersService } from './authorized-users/authorized-users.service';
import { HttpClientModule } from '../common/services/http-client.module';

@Module({
  imports: [HttpClientModule],
  controllers: [ReservationsController, AuthorizedUsersController],
  providers: [ReservationsService, AuthorizedUsersService],
})
export class ReservationsModule {}


import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { FurnituresController } from './furnitures/furnitures.controller';
import { FurnituresService } from './furnitures/furnitures.service';
import { HttpClientModule } from '../common/services/http-client.module';

@Module({
  imports: [HttpClientModule],
  controllers: [RoomsController, FurnituresController],
  providers: [RoomsService, FurnituresService],
})
export class RoomsModule {}


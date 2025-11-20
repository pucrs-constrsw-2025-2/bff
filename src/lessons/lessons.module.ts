import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { HttpClientModule } from '../common/services/http-client.module';

@Module({
  imports: [HttpClientModule],
  controllers: [LessonsController, SubjectsController],
  providers: [LessonsService, SubjectsService],
})
export class LessonsModule {}


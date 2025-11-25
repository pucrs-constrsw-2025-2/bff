import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { ExamsController } from './exams/exams.controller';
import { ExamsService } from './exams/exams.service';
import { HttpClientModule } from '../common/services/http-client.module';

@Module({
  imports: [HttpClientModule],
  controllers: [ClassesController, ExamsController],
  providers: [ClassesService, ExamsService],
})
export class ClassesModule {}


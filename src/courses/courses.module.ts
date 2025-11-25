import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { MaterialsController } from './materials/materials.controller';
import { MaterialsService } from './materials/materials.service';
import { HttpClientModule } from '../common/services/http-client.module';

@Module({
  imports: [HttpClientModule],
  controllers: [CoursesController, MaterialsController],
  providers: [CoursesService, MaterialsService],
})
export class CoursesModule {}


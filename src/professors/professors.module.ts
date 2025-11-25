import { Module } from '@nestjs/common';
import { ProfessorsController } from './professors.controller';
import { ProfessorsService } from './professors.service';
import { ProfessorsClassesController } from './classes/classes.controller';
import { ProfessorsClassesService } from './classes/classes.service';
import { GraduationsController } from './graduations/graduations.controller';
import { GraduationsGeneralController } from './graduations/graduations-general.controller';
import { GraduationsService } from './graduations/graduations.service';
import { HttpClientModule } from '../common/services/http-client.module';

@Module({
  imports: [HttpClientModule],
  controllers: [
    ProfessorsController,
    ProfessorsClassesController,
    GraduationsController,
    GraduationsGeneralController,
  ],
  providers: [ProfessorsService, ProfessorsClassesService, GraduationsService],
})
export class ProfessorsModule {}


import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { PhoneNumbersController } from './phone-numbers/phone-numbers.controller';
import { PhoneNumbersService } from './phone-numbers/phone-numbers.service';
import { HttpClientModule } from '../common/services/http-client.module';

@Module({
  imports: [HttpClientModule],
  controllers: [StudentsController, PhoneNumbersController],
  providers: [StudentsService, PhoneNumbersService],
})
export class StudentsModule {}


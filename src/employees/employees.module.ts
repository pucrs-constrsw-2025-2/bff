import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { HttpClientModule } from '../common/services/http-client.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [HttpClientModule, AuthModule],
  controllers: [EmployeesController, TasksController],
  providers: [EmployeesService, TasksService],
})
export class EmployeesModule {}


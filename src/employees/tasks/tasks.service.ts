import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../common/services/http-client.service';

@Injectable()
export class TasksService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(employeeId: string, query: any) {
    const params = new URLSearchParams();
    if (query.page) params.append('page', query.page);
    if (query.limit) params.append('limit', query.limit);
    if (query.description) params.append('description', query.description);
    if (query.startDate) params.append('startDate', query.startDate);
    if (query.endDate) params.append('endDate', query.endDate);

    const queryString = params.toString();
    return this.httpClient.get(
      'employees',
      `/api/v1/employees/${employeeId}/tasks${queryString ? `?${queryString}` : ''}`,
    );
  }

  async findOne(employeeId: string, taskId: string) {
    return this.httpClient.get('employees', `/api/v1/employees/${employeeId}/tasks/${taskId}`);
  }

  async create(employeeId: string, createDto: any) {
    return this.httpClient.post('employees', `/api/v1/employees/${employeeId}/tasks`, createDto);
  }

  async update(employeeId: string, taskId: string, updateDto: any) {
    return this.httpClient.put(
      'employees',
      `/api/v1/employees/${employeeId}/tasks/${taskId}`,
      updateDto,
    );
  }

  async patch(employeeId: string, taskId: string, updateDto: any) {
    return this.httpClient.patch(
      'employees',
      `/api/v1/employees/${employeeId}/tasks/${taskId}`,
      updateDto,
    );
  }

  async remove(employeeId: string, taskId: string) {
    return this.httpClient.delete('employees', `/api/v1/employees/${employeeId}/tasks/${taskId}`);
  }
}


import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(pagination: PaginationDto, search?: string) {
    const params = new URLSearchParams();
    params.append('page', (pagination.page || 1).toString());
    params.append('limit', (pagination.size || 10).toString());
    if (search) {
      params.append('search', search);
    }

    return this.httpClient.get(
      'employees',
      `/api/v1/employees?${params.toString()}`,
    );
  }

  async findOne(id: string) {
    return this.httpClient.get('employees', `/api/v1/employees/${id}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('employees', '/api/v1/employees', createDto);
  }

  async update(id: string, updateDto: any) {
    return this.httpClient.put('employees', `/api/v1/employees/${id}`, updateDto);
  }

  async remove(id: string) {
    return this.httpClient.delete('employees', `/api/v1/employees/${id}`);
  }
}


import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';

@Injectable()
export class StudentsService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(query: any) {
    const params = new URLSearchParams();
    if (query.name) params.append('name', query.name);
    if (query.enrollment) params.append('enrollment', query.enrollment);
    if (query.email) params.append('email', query.email);

    const queryString = params.toString();
    return this.httpClient.get(
      'students',
      `/api/v1/students${queryString ? `?${queryString}` : ''}`,
    );
  }

  async findOne(id: string) {
    return this.httpClient.get('students', `/api/v1/students/${id}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('students', '/api/v1/students', createDto);
  }

  async update(id: string, updateDto: any) {
    return this.httpClient.put('students', `/api/v1/students/${id}`, updateDto);
  }

  async remove(id: string) {
    return this.httpClient.delete('students', `/api/v1/students/${id}`);
  }
}


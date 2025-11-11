import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';

@Injectable()
export class ClassesService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(query: any) {
    const params = new URLSearchParams();
    if (query.year) params.append('year', query.year);
    if (query.semester) params.append('semester', query.semester);
    if (query.course_id) params.append('course_id', query.course_id);
    if (query.page) params.append('page', query.page);
    if (query.size) params.append('size', query.size);

    const queryString = params.toString();
    return this.httpClient.get(
      'classes',
      `/api/v1/classes${queryString ? `?${queryString}` : ''}`,
    );
  }

  async findOne(id: string) {
    return this.httpClient.get('classes', `/api/v1/classes/${id}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('classes', '/api/v1/classes', createDto);
  }

  async update(id: string, updateDto: any) {
    return this.httpClient.put('classes', `/api/v1/classes/${id}`, updateDto);
  }

  async remove(id: string) {
    return this.httpClient.delete('classes', `/api/v1/classes/${id}`);
  }
}


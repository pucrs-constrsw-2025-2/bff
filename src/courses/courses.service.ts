import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';

@Injectable()
export class CoursesService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(query: any) {
    const params = new URLSearchParams();
    if (query.name) params.append('name', query.name);
    if (query.modality) params.append('modality', query.modality);

    const queryString = params.toString();
    return this.httpClient.get(
      'courses',
      `/api/v1/courses${queryString ? `?${queryString}` : ''}`,
    );
  }

  async findOne(id: string) {
    return this.httpClient.get('courses', `/api/v1/courses/${id}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('courses', '/api/v1/courses', createDto);
  }

  async update(id: string, updateDto: any) {
    return this.httpClient.put('courses', `/api/v1/courses/${id}`, updateDto);
  }

  async remove(id: string) {
    return this.httpClient.delete('courses', `/api/v1/courses/${id}`);
  }
}


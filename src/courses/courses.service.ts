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
      `/courses${queryString ? `?${queryString}` : ''}`,
    );
  }

  async findOne(id: string) {
    return this.httpClient.get('courses', `/courses/${id}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('courses', '/courses', createDto);
  }

  async update(id: string, updateDto: any) {
    return this.httpClient.put('courses', `/courses/${id}`, updateDto);
  }

  async remove(id: string) {
    return this.httpClient.delete('courses', `/courses/${id}`);
  }
}


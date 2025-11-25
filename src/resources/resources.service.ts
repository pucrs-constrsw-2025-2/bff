import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';

@Injectable()
export class ResourcesService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(query: any) {
    const params = new URLSearchParams();
    if (query.categoryId) params.append('categoryId', query.categoryId);

    const queryString = params.toString();
    return this.httpClient.get(
      'resources',
      `/api/v1/resources${queryString ? `?${queryString}` : ''}`,
    );
  }

  async findOne(resourceId: string) {
    return this.httpClient.get('resources', `/api/v1/resources/${resourceId}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('resources', '/api/v1/resources', createDto);
  }

  async update(resourceId: string, updateDto: any) {
    return this.httpClient.put('resources', `/api/v1/resources/${resourceId}`, updateDto);
  }

  async patch(resourceId: string, updateDto: any) {
    return this.httpClient.patch('resources', `/api/v1/resources/${resourceId}`, updateDto);
  }

  async remove(resourceId: string) {
    return this.httpClient.delete('resources', `/api/v1/resources/${resourceId}`);
  }

  async getResourcesByCategory(categoryId: string) {
    return this.httpClient.get('resources', `/api/v1/resources/category/${categoryId}`);
  }
}


import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../common/services/http-client.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll() {
    return this.httpClient.get('resources', '/api/v1/categories');
  }

  async findOne(categoryId: string) {
    return this.httpClient.get('resources', `/api/v1/categories/${categoryId}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('resources', '/api/v1/categories', createDto);
  }

  async update(categoryId: string, updateDto: any) {
    return this.httpClient.put('resources', `/api/v1/categories/${categoryId}`, updateDto);
  }

  async patch(categoryId: string, updateDto: any) {
    return this.httpClient.patch('resources', `/api/v1/categories/${categoryId}`, updateDto);
  }

  async remove(categoryId: string) {
    return this.httpClient.delete('resources', `/api/v1/categories/${categoryId}`);
  }

  async getCategoryResources(categoryId: string) {
    return this.httpClient.get('resources', `/api/v1/categories/${categoryId}/resources`);
  }

  async createCategoryResource(categoryId: string, createDto: any) {
    return this.httpClient.post('resources', `/api/v1/categories/${categoryId}/resources`, createDto);
  }

  async getCategoryFeatures(categoryId: string) {
    return this.httpClient.get('resources', `/api/v1/categories/${categoryId}/features`);
  }

  async createCategoryFeature(categoryId: string, createDto: any) {
    return this.httpClient.post('resources', `/api/v1/categories/${categoryId}/features`, createDto);
  }
}


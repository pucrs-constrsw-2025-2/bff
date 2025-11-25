import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../common/services/http-client.service';

@Injectable()
export class FeaturesService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(categoryId?: string) {
    const params = categoryId ? `?categoryId=${categoryId}` : '';
    return this.httpClient.get('resources', `/api/v1/features${params}`);
  }

  async findOne(featureId: string) {
    return this.httpClient.get('resources', `/api/v1/features/${featureId}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('resources', '/api/v1/features', createDto);
  }

  async update(featureId: string, updateDto: any) {
    return this.httpClient.put('resources', `/api/v1/features/${featureId}`, updateDto);
  }

  async patch(featureId: string, updateDto: any) {
    return this.httpClient.patch('resources', `/api/v1/features/${featureId}`, updateDto);
  }

  async remove(featureId: string) {
    return this.httpClient.delete('resources', `/api/v1/features/${featureId}`);
  }

  async getFeaturesByCategory(categoryId: string) {
    return this.httpClient.get('resources', `/api/v1/features/category/${categoryId}`);
  }
}


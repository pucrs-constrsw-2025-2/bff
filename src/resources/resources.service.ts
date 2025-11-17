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

  async findOne(id: string) {
    return this.httpClient.get('resources', `/api/v1/resources/${id}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('resources', '/api/v1/resources', createDto);
  }

  async update(id: string, updateDto: any) {
    return this.httpClient.put('resources', `/api/v1/resources/${id}`, updateDto);
  }

  async remove(id: string) {
    return this.httpClient.delete('resources', `/api/v1/resources/${id}`);
  }

  async patch(id: string, partialDto: any) {
    return this.httpClient.patch('resources', `/api/v1/resources/${id}`, partialDto);
  }

  // Features (feature values) endpoints
  async createFeature(resourceId: string, createDto: any) {
    return this.httpClient.post(
      'resources',
      `/api/v1/resources/${resourceId}/features`,
      createDto,
    );
  }

  async findFeatures(resourceId: string, query: any) {
    const params = new URLSearchParams();
    if (query?.featureId) params.append('featureId', query.featureId);
    if (query?.valueString) params.append('valueString', query.valueString);

    const queryString = params.toString();
    return this.httpClient.get(
      'resources',
      `/api/v1/resources/${resourceId}/features${queryString ? `?${queryString}` : ''}`,
    );
  }

  async findFeature(resourceId: string, featureValueId: string) {
    return this.httpClient.get(
      'resources',
      `/api/v1/resources/${resourceId}/features/${featureValueId}`,
    );
  }

  async updateFeature(resourceId: string, featureValueId: string, updateDto: any) {
    return this.httpClient.put(
      'resources',
      `/api/v1/resources/${resourceId}/features/${featureValueId}`,
      updateDto,
    );
  }

  async patchFeature(resourceId: string, featureValueId: string, partialDto: any) {
    return this.httpClient.patch(
      'resources',
      `/api/v1/resources/${resourceId}/features/${featureValueId}`,
      partialDto,
    );
  }

  async removeFeature(resourceId: string, featureValueId: string) {
    return this.httpClient.delete(
      'resources',
      `/api/v1/resources/${resourceId}/features/${featureValueId}`,
    );
  }
}


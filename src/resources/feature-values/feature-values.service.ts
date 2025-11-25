import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../common/services/http-client.service';

@Injectable()
export class FeatureValuesService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll() {
    return this.httpClient.get('resources', '/api/v1/feature-values');
  }

  async findOne(featureValueId: string) {
    return this.httpClient.get('resources', `/api/v1/feature-values/${featureValueId}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('resources', '/api/v1/feature-values', createDto);
  }

  async patch(featureValueId: string, updateDto: any) {
    return this.httpClient.patch('resources', `/api/v1/feature-values/${featureValueId}`, updateDto);
  }

  async remove(featureValueId: string) {
    return this.httpClient.delete('resources', `/api/v1/feature-values/${featureValueId}`);
  }

  async getFeatureValuesByResource(resourceId: string) {
    return this.httpClient.get('resources', `/api/v1/feature-values/resource/${resourceId}`);
  }

  async getFeatureValuesByFeature(featureId: string) {
    return this.httpClient.get('resources', `/api/v1/feature-values/feature/${featureId}`);
  }

  async listResourceFeatureValues(resourceId: string) {
    return this.httpClient.get('resources', `/api/v1/feature-values/resources/${resourceId}/features`);
  }

  async createResourceFeatureValue(resourceId: string, createDto: any) {
    return this.httpClient.post(
      'resources',
      `/api/v1/feature-values/resources/${resourceId}/features`,
      createDto,
    );
  }

  async getResourceFeatureValue(resourceId: string, featureValueId: string) {
    return this.httpClient.get(
      'resources',
      `/api/v1/feature-values/resources/${resourceId}/features/${featureValueId}`,
    );
  }

  async patchResourceFeatureValue(resourceId: string, featureValueId: string, updateDto: any) {
    return this.httpClient.patch(
      'resources',
      `/api/v1/feature-values/resources/${resourceId}/features/${featureValueId}`,
      updateDto,
    );
  }

  async deleteResourceFeatureValue(resourceId: string, featureValueId: string) {
    return this.httpClient.delete(
      'resources',
      `/api/v1/feature-values/resources/${resourceId}/features/${featureValueId}`,
    );
  }
}


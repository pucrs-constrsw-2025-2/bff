import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../common/services/http-client.service';

@Injectable()
export class MaterialsService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(courseId: string, name?: string) {
    const params = name ? `?name=${name}` : '';
    return this.httpClient.get('courses', `/api/v1/courses/${courseId}/materials${params}`);
  }

  async findOne(courseId: string, materialId: string) {
    return this.httpClient.get('courses', `/api/v1/courses/${courseId}/materials/${materialId}`);
  }

  async create(courseId: string, createDto: any) {
    return this.httpClient.post('courses', `/api/v1/courses/${courseId}/materials`, createDto);
  }

  async update(courseId: string, materialId: string, updateDto: any) {
    return this.httpClient.put(
      'courses',
      `/api/v1/courses/${courseId}/materials/${materialId}`,
      updateDto,
    );
  }

  async patch(courseId: string, materialId: string, updateDto: any) {
    return this.httpClient.patch(
      'courses',
      `/api/v1/courses/${courseId}/materials/${materialId}`,
      updateDto,
    );
  }

  async remove(courseId: string, materialId: string) {
    return this.httpClient.delete('courses', `/api/v1/courses/${courseId}/materials/${materialId}`);
  }
}


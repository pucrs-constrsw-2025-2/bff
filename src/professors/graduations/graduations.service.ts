import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../common/services/http-client.service';

@Injectable()
export class GraduationsService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(professorId: string) {
    return this.httpClient.get('professors', `/api/v1/professors/${professorId}/graduations`);
  }

  async create(professorId: string, createDto: any) {
    return this.httpClient.post('professors', `/api/v1/professors/${professorId}/graduations`, createDto);
  }

  async update(professorId: string, graduationId: string, updateDto: any) {
    return this.httpClient.put(
      'professors',
      `/api/v1/professors/${professorId}/graduations/${graduationId}`,
      updateDto,
    );
  }

  async remove(professorId: string, graduationId: string) {
    return this.httpClient.delete(
      'professors',
      `/api/v1/professors/${professorId}/graduations/${graduationId}`,
    );
  }

  async findAllGeneral() {
    return this.httpClient.get('professors', '/api/v1/graduations');
  }
}


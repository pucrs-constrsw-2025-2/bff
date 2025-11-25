import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../common/services/http-client.service';

@Injectable()
export class ProfessorsClassesService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(professorId: string) {
    return this.httpClient.get('professors', `/api/v1/professors/${professorId}/classes`);
  }

  async create(professorId: string, classId: string) {
    return this.httpClient.post('professors', `/api/v1/professors/${professorId}/classes`, { classId });
  }

  async remove(professorId: string, classId: string) {
    return this.httpClient.delete('professors', `/api/v1/professors/${professorId}/classes/${classId}`);
  }
}


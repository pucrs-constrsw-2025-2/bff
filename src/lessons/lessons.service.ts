import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';

@Injectable()
export class LessonsService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll() {
    return this.httpClient.get('lessons', '/api/v1/lessons');
  }

  async findOne(id: string) {
    return this.httpClient.get('lessons', `/api/v1/lessons/${id}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('lessons', '/api/v1/lessons', createDto);
  }

  async update(id: string, updateDto: any) {
    return this.httpClient.put('lessons', `/api/v1/lessons/${id}`, updateDto);
  }

  async remove(id: string) {
    return this.httpClient.delete('lessons', `/api/v1/lessons/${id}`);
  }
}


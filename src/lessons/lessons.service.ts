import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';

@Injectable()
export class LessonsService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll() {
    return this.httpClient.get('lessons', '/api/v1/lessons');
  }

  async findOne(lessonId: string) {
    return this.httpClient.get('lessons', `/api/v1/lessons/${lessonId}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('lessons', '/api/v1/lessons', createDto);
  }

  async update(lessonId: string, updateDto: any) {
    return this.httpClient.put('lessons', `/api/v1/lessons/${lessonId}`, updateDto);
  }

  async patch(lessonId: string, updateDto: any) {
    return this.httpClient.patch('lessons', `/api/v1/lessons/${lessonId}`, updateDto);
  }

  async remove(lessonId: string) {
    return this.httpClient.delete('lessons', `/api/v1/lessons/${lessonId}`);
  }
}


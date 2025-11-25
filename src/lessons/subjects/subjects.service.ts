import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../common/services/http-client.service';

@Injectable()
export class SubjectsService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(lessonId: string) {
    return this.httpClient.get('lessons', `/api/v1/lessons/${lessonId}/subjects`);
  }

  async findOne(lessonId: string, subjectId: string) {
    return this.httpClient.get('lessons', `/api/v1/lessons/${lessonId}/subjects/${subjectId}`);
  }

  async create(lessonId: string, createDto: any) {
    return this.httpClient.post('lessons', `/api/v1/lessons/${lessonId}/subjects`, createDto);
  }

  async update(lessonId: string, subjectId: string, updateDto: any) {
    return this.httpClient.put('lessons', `/api/v1/lessons/${lessonId}/subjects/${subjectId}`, updateDto);
  }

  async patch(lessonId: string, subjectId: string, updateDto: any) {
    return this.httpClient.patch('lessons', `/api/v1/lessons/${lessonId}/subjects/${subjectId}`, updateDto);
  }

  async remove(lessonId: string, subjectId: string) {
    return this.httpClient.delete('lessons', `/api/v1/lessons/${lessonId}/subjects/${subjectId}`);
  }
}


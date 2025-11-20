import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';

@Injectable()
export class SubjectsService {
  constructor(private readonly httpClient: HttpClientService) {}

  private buildPath(lessonId: string, suffix = ''): string {
    const base = `/api/v1/lessons/${lessonId}/subjects`;
    return suffix ? `${base}/${suffix}` : base;
  }

  create(lessonId: string, dto: any) {
    return this.httpClient.post('lessons', this.buildPath(lessonId), dto);
  }

  findAll(lessonId: string) {
    return this.httpClient.get('lessons', this.buildPath(lessonId));
  }

  findOne(lessonId: string, subjectId: string) {
    return this.httpClient.get(
      'lessons',
      this.buildPath(lessonId, subjectId),
    );
  }

  updateFull(lessonId: string, subjectId: string, dto: any) {
    return this.httpClient.put(
      'lessons',
      this.buildPath(lessonId, subjectId),
      dto,
    );
  }

  updatePartial(lessonId: string, subjectId: string, dto: any) {
    return this.httpClient.patch(
      'lessons',
      this.buildPath(lessonId, subjectId),
      dto,
    );
  }

  remove(lessonId: string, subjectId: string) {
    return this.httpClient.delete(
      'lessons',
      this.buildPath(lessonId, subjectId),
    );
  }
}

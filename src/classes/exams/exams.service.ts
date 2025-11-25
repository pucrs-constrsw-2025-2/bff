import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../common/services/http-client.service';

@Injectable()
export class ExamsService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(classId: string) {
    return this.httpClient.get('classes', `/api/v1/classes/${classId}/exams`);
  }

  async findOne(classId: string, examId: string) {
    return this.httpClient.get('classes', `/api/v1/classes/${classId}/exams/${examId}`);
  }

  async create(classId: string, createDto: any) {
    return this.httpClient.post('classes', `/api/v1/classes/${classId}/exams`, createDto);
  }

  async update(classId: string, examId: string, updateDto: any) {
    return this.httpClient.put('classes', `/api/v1/classes/${classId}/exams/${examId}`, updateDto);
  }

  async patch(classId: string, examId: string, updateDto: any) {
    return this.httpClient.patch('classes', `/api/v1/classes/${classId}/exams/${examId}`, updateDto);
  }

  async remove(classId: string, examId: string) {
    return this.httpClient.delete('classes', `/api/v1/classes/${classId}/exams/${examId}`);
  }
}


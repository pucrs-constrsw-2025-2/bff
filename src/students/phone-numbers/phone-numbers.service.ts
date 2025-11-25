import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../common/services/http-client.service';

@Injectable()
export class PhoneNumbersService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(studentId: string) {
    return this.httpClient.get('students', `/api/v1/students/${studentId}/phone-numbers`);
  }

  async findOne(studentId: string, phoneNumberId: string) {
    return this.httpClient.get(
      'students',
      `/api/v1/students/${studentId}/phone-numbers/${phoneNumberId}`,
    );
  }

  async create(studentId: string, createDto: any) {
    return this.httpClient.post('students', `/api/v1/students/${studentId}/phone-numbers`, createDto);
  }

  async update(studentId: string, phoneNumberId: string, updateDto: any) {
    return this.httpClient.put(
      'students',
      `/api/v1/students/${studentId}/phone-numbers/${phoneNumberId}`,
      updateDto,
    );
  }

  async patch(studentId: string, phoneNumberId: string, updateDto: any) {
    return this.httpClient.patch(
      'students',
      `/api/v1/students/${studentId}/phone-numbers/${phoneNumberId}`,
      updateDto,
    );
  }

  async remove(studentId: string, phoneNumberId: string) {
    return this.httpClient.delete(
      'students',
      `/api/v1/students/${studentId}/phone-numbers/${phoneNumberId}`,
    );
  }
}


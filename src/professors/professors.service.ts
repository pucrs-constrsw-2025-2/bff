import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';

@Injectable()
export class ProfessorsService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(query: any) {
    const params = new URLSearchParams();
    if (query.name) params.append('name', query.name);
    if (query.status) params.append('status', query.status);

    const queryString = params.toString();
    return this.httpClient.get(
      'professors',
      `/api/v1/professors${queryString ? `?${queryString}` : ''}`,
    );
  }

  async findOne(id: string) {
    return this.httpClient.get('professors', `/api/v1/professors/${id}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('professors', '/api/v1/professors/', createDto);
  }

  async update(id: string, updateDto: any) {
    return this.httpClient.put('professors', `/api/v1/professors/${id}`, updateDto);
  }

  async remove(id: string) {
    return this.httpClient.delete('professors', `/api/v1/professors/${id}`);
  }
}


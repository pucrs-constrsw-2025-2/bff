import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';

@Injectable()
export class RolesService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(enabled?: boolean) {
    const params = enabled !== undefined ? `?enabled=${enabled}` : '';
    return this.httpClient.get('oauth', `/api/v1/roles${params}`);
  }

  async findOne(id: string) {
    return this.httpClient.get('oauth', `/api/v1/roles/${id}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('oauth', '/api/v1/roles', createDto);
  }

  async update(id: string, updateDto: any) {
    return this.httpClient.put('oauth', `/api/v1/roles/${id}`, updateDto);
  }

  async remove(id: string) {
    return this.httpClient.delete('oauth', `/api/v1/roles/${id}`);
  }
}


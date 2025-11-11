import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';

@Injectable()
export class RoomsService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(query: any) {
    const params = new URLSearchParams();
    Object.keys(query).forEach((key) => {
      if (query[key] !== undefined && query[key] !== null) {
        params.append(key, query[key]);
      }
    });

    const queryString = params.toString();
    return this.httpClient.get(
      'rooms',
      `/api/v1/rooms${queryString ? `?${queryString}` : ''}`,
    );
  }

  async findOne(id: string) {
    return this.httpClient.get('rooms', `/api/v1/rooms/${id}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('rooms', '/api/v1/rooms', createDto);
  }

  async update(id: string, updateDto: any) {
    return this.httpClient.put('rooms', `/api/v1/rooms/${id}`, updateDto);
  }

  async remove(id: string) {
    return this.httpClient.delete('rooms', `/api/v1/rooms/${id}`);
  }
}


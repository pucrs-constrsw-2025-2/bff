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

  async findOne(roomId: string) {
    return this.httpClient.get('rooms', `/api/v1/rooms/${roomId}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('rooms', '/api/v1/rooms', createDto);
  }

  async update(roomId: string, updateDto: any) {
    return this.httpClient.put('rooms', `/api/v1/rooms/${roomId}`, updateDto);
  }

  async patch(roomId: string, updateDto: any) {
    return this.httpClient.patch('rooms', `/api/v1/rooms/${roomId}`, updateDto);
  }

  async remove(roomId: string) {
    return this.httpClient.delete('rooms', `/api/v1/rooms/${roomId}`);
  }
}


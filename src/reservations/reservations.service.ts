import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';

@Injectable()
export class ReservationsService {
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
      'reservations',
      `/api/v1/reservation${queryString ? `?${queryString}` : ''}`,
    );
  }

  async findOne(id: string) {
    return this.httpClient.get('reservations', `/api/v1/reservation/${id}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('reservations', '/api/v1/reservation', createDto);
  }

  async update(id: string, updateDto: any) {
    return this.httpClient.put('reservations', `/api/v1/reservation/${id}`, updateDto);
  }

  async remove(id: string) {
    return this.httpClient.delete('reservations', `/api/v1/reservation/${id}`);
  }
}


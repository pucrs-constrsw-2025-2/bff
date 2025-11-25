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
      `/api/v1/reservations${queryString ? `?${queryString}` : ''}`,
    );
  }

  async findOne(reservationId: string) {
    return this.httpClient.get('reservations', `/api/v1/reservations/${reservationId}`);
  }

  async create(createDto: any) {
    return this.httpClient.post('reservations', '/api/v1/reservations', createDto);
  }

  async update(reservationId: string, updateDto: any) {
    return this.httpClient.put('reservations', `/api/v1/reservations/${reservationId}`, updateDto);
  }

  async patch(reservationId: string, updateDto: any) {
    return this.httpClient.patch('reservations', `/api/v1/reservations/${reservationId}`, updateDto);
  }

  async remove(reservationId: string) {
    return this.httpClient.delete('reservations', `/api/v1/reservations/${reservationId}`);
  }
}


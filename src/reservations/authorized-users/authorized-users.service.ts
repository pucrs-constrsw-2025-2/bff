import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../common/services/http-client.service';

@Injectable()
export class AuthorizedUsersService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(reservationId: string) {
    return this.httpClient.get('reservations', `/api/v1/reservations/${reservationId}/authorized-users`);
  }

  async findOne(reservationId: string, authorizedUserId: string) {
    return this.httpClient.get(
      'reservations',
      `/api/v1/reservations/${reservationId}/authorized-users/${authorizedUserId}`,
    );
  }

  async create(reservationId: string, createDto: any) {
    return this.httpClient.post(
      'reservations',
      `/api/v1/reservations/${reservationId}/authorized-users`,
      createDto,
    );
  }

  async update(reservationId: string, authorizedUserId: string, updateDto: any) {
    return this.httpClient.put(
      'reservations',
      `/api/v1/reservations/${reservationId}/authorized-users/${authorizedUserId}`,
      updateDto,
    );
  }

  async patch(reservationId: string, authorizedUserId: string, updateDto: any) {
    return this.httpClient.patch(
      'reservations',
      `/api/v1/reservations/${reservationId}/authorized-users/${authorizedUserId}`,
      updateDto,
    );
  }

  async remove(reservationId: string, authorizedUserId: string) {
    return this.httpClient.delete(
      'reservations',
      `/api/v1/reservations/${reservationId}/authorized-users/${authorizedUserId}`,
    );
  }
}


import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../common/services/http-client.service';

@Injectable()
export class FurnituresService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(roomId: string) {
    return this.httpClient.get('rooms', `/api/v1/rooms/${roomId}/furnitures`);
  }

  async findOne(roomId: string, furnitureId: string) {
    return this.httpClient.get('rooms', `/api/v1/rooms/${roomId}/furnitures/${furnitureId}`);
  }

  async create(roomId: string, createDto: any) {
    return this.httpClient.post('rooms', `/api/v1/rooms/${roomId}/furnitures`, createDto);
  }

  async update(roomId: string, furnitureId: string, updateDto: any) {
    return this.httpClient.put('rooms', `/api/v1/rooms/${roomId}/furnitures/${furnitureId}`, updateDto);
  }

  async patch(roomId: string, furnitureId: string, updateDto: any) {
    return this.httpClient.patch('rooms', `/api/v1/rooms/${roomId}/furnitures/${furnitureId}`, updateDto);
  }

  async remove(roomId: string, furnitureId: string) {
    return this.httpClient.delete('rooms', `/api/v1/rooms/${roomId}/furnitures/${furnitureId}`);
  }
}


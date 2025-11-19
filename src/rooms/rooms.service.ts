import { Injectable } from '/nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PatchRoomDto } from './dto/patch-room.dto';
import { QueryRoomDto } from './dto/query-room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll(query: QueryRoomDto) {
    const params = new URLSearchParams();
    (Object.keys(query) as Array<keyof QueryRoomDto>).forEach((key) => {
      const value = query[key];
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });

    const queryString = params.toString();
    return this.httpClient.get('rooms', `/api/v1/rooms${queryString ? `?${queryString}` : ''}`);
  }

  async findOne(id: string) {
    return this.httpClient.get('rooms', `/api/v1/rooms/${id}`);
  }

  async create(createDto: CreateRoomDto) {
    return this.httpClient.post('rooms', '/api/v1/rooms', createDto);
  }

  async update(id: string, updateDto: UpdateRoomDto) {
    return this.httpClient.put('rooms', `/api/v1/rooms/${id}`, updateDto);
  }

  async patch(id: string, patchDto: PatchRoomDto) {
    return this.httpClient.patch('rooms', `/api/v1/rooms/${id}`, patchDto);
  }

  async remove(id: string) {
    return this.httpClient.delete('rooms', `/api/v1/rooms/${id}`);
  }
}

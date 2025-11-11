import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../common/services/http-client.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpClient: HttpClientService,
    private readonly configService: ConfigService,
  ) {}

  async findAll(pagination: PaginationDto, enabled?: boolean) {
    const params = new URLSearchParams();
    if (enabled !== undefined) {
      params.append('enabled', enabled.toString());
    }

    const queryString = params.toString();
    const url = `/api/v1/users${queryString ? `?${queryString}` : ''}`;

    return this.httpClient.get('oauth', url);
  }

  async findOne(userId: string) {
    try {
      return await this.httpClient.get('oauth', `/api/v1/users/${userId}`);
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
      }
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto) {
    return this.httpClient.post('oauth', '/api/v1/users', createUserDto);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.httpClient.put(
        'oauth',
        `/api/v1/users/${userId}`,
        updateUserDto,
      );
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
      }
      throw error;
    }
  }

  async remove(userId: string) {
    try {
      return await this.httpClient.delete('oauth', `/api/v1/users/${userId}`);
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
      }
      throw error;
    }
  }
}


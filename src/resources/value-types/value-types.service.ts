import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../common/services/http-client.service';

@Injectable()
export class ValueTypesService {
  constructor(private readonly httpClient: HttpClientService) {}

  async findAll() {
    return this.httpClient.get('resources', '/api/v1/value-types');
  }
}


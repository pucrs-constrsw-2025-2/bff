import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';

@Injectable()
export class ProfessorsService {
  constructor(private readonly httpClient: HttpClientService) {}

  /**
   * Mapeia o DTO do BFF (o que o frontend envia) para o modelo
   * esperado pelo microsserviço de Professores.
   */
  private toMicroservice(dto: any): any {
    // O microsserviço espera um 'int' para registration_number
    const registrationNumber = parseInt(dto.document, 10);

    return {
      name: dto.name,
      registration_number: isNaN(registrationNumber) ? null : registrationNumber,
      institucional_email: dto.email,
      status: dto.status,
    };
  }

  /**
   * Mapeia a resposta do microsserviço de Professores de volta
   * para o DTO do BFF (o que o frontend espera).
   */
  private fromMicroservice(data: any): any {
    return {
      id: data.id,
      name: data.name,
      document: data.registration_number,
      email: data.institucional_email,
      status: data.status,
    };
  }

  async findAll(query: any, token: string) {
    const params = new URLSearchParams();
    if (query.name) params.append('name', query.name);
    if (query.status) params.append('status', query.status);

    const queryString = params.toString();
    const result = await this.httpClient.get<any[]>(
      'professors',
      `/api/v1/professors${queryString ? `?${queryString}` : ''}`,
      { headers: { Authorization: token } }
    );

    return Array.isArray(result)
      ? result.map(this.fromMicroservice)
      : result;
  }

  async findOne(id: string, token: string) {
    const result = await this.httpClient.get<any>(
      'professors',
      `/api/v1/professors/${id}`,
      { headers: { Authorization: token } }
    );
    return this.fromMicroservice(result);
  }

  async create(createDto: any, token: string) {
    const microserviceDto = this.toMicroservice(createDto);

    return this.httpClient.post(
      'professors',
      '/api/v1/professors/',
      microserviceDto,
      { headers: { Authorization: token } }
    );
  }

  async update(id: string, updateDto: any, token: string) {
    const microserviceDto = this.toMicroservice(updateDto);

    return this.httpClient.put(
      'professors',
      `/api/v1/professors/${id}`,
      microserviceDto,
      { headers: { Authorization: token } }
    );
  }

  async remove(id: string, token: string) {
    return this.httpClient.delete(
      'professors', 
      `/api/v1/professors/${id}`,
      { headers: { Authorization: token } }
    );
  }

  // --- Métodos de Graduação ---

  async findGraduations(professorId: string, token: string) {
    return this.httpClient.get<any[]>(
      'professors',
      `/api/v1/professors/${professorId}/graduations/`,
      { headers: { Authorization: token } }
    );
  }

  async createGraduation(professorId: string, createDto: any, token: string) {
    return this.httpClient.post(
      'professors',
      `/api/v1/professors/${professorId}/graduations/`,
      createDto,
      { headers: { Authorization: token } }
    );
  }

  async updateGraduation(
    professorId: string,
    graduationId: string,
    updateDto: any,
    token: string
  ) {
    return this.httpClient.put(
      'professors',
      `/api/v1/professors/${professorId}/graduations/${graduationId}`,
      updateDto,
      { headers: { Authorization: token } }
    );
  }

  async deleteGraduation(professorId: string, graduationId: string, token: string) {
    return this.httpClient.delete(
      'professors',
      `/api/v1/professors/${professorId}/graduations/${graduationId}`,
      { headers: { Authorization: token } }
    );
  }
}
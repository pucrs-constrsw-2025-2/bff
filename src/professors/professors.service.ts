import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';

@Injectable()
export class ProfessorsService {
  constructor(private readonly httpClient: HttpClientService) {}

  /**
   * Mapeia o DTO do BFF (o que o frontend envia) para o modelo
   * esperado pelo microsserviço de Professores.
   * (Baseado em openapi.yaml e professors/core/domain/professor_models.py)
   */
  private toMicroservice(dto: any): any {
    // O microsserviço espera um 'int' para registration_number
    const registrationNumber = parseInt(dto.document, 10);

    return {
      name: dto.name,
      registration_number: isNaN(registrationNumber) ? null : registrationNumber, // Mapeia 'document' para 'registration_number'
      institucional_email: dto.email, // Mapeia 'email' para 'institucional_email'
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
      document: data.registration_number, // Mapeia 'registration_number' para 'document'
      email: data.institucional_email, // Mapeia 'institucional_email' para 'email'
      status: data.status,
    };
  }

  async findAll(query: any) {
    const params = new URLSearchParams();
    // Os parâmetros de query 'name' e 'status' estão corretos
    // conforme /professors/adapters/api/routes/professors.py
    if (query.name) params.append('name', query.name);
    if (query.status) params.append('status', query.status);

    const queryString = params.toString();
    const result = await this.httpClient.get<any[]>(
      'professors',
      `/api/v1/professors${queryString ? `?${queryString}` : ''}`,
    );

    // Mapeia a resposta
    return Array.isArray(result)
      ? result.map(this.fromMicroservice)
      : result;
  }

  async findOne(id: string) {
    const result = await this.httpClient.get<any>(
      'professors',
      `/api/v1/professors/${id}`,
    );
    // Mapeia a resposta
    return this.fromMicroservice(result);
  }

  async create(createDto: any) {
    // Mapeia o DTO de requisição
    const microserviceDto = this.toMicroservice(createDto);

    return this.httpClient.post(
      'professors',
      '/api/v1/professors/',
      microserviceDto,
    );
  }

  async update(id: string, updateDto: any) {
    // Mapeia o DTO de requisição
    const microserviceDto = this.toMicroservice(updateDto);

    return this.httpClient.put(
      'professors',
      `/api/v1/professors/${id}`,
      microserviceDto,
    );
  }

  async remove(id: string) {
    return this.httpClient.delete('professors', `/api/v1/professors/${id}`);
  }

  // --- Métodos de Graduação ---

  async findGraduations(professorId: string) {
    // A rota no microsserviço é /api/v1/professors/{id}/graduations/
    return this.httpClient.get<any[]>(
      'professors',
      `/api/v1/professors/${professorId}/graduations/`,
    );
  }

  async createGraduation(professorId: string, createDto: any) {
    // NOTE: DTO (createDto) está sendo passado diretamente.
    // Se o BFF tiver um DTO diferente do microsserviço,
    // um mapeador 'toMicroserviceGraduation' seria necessário.
    return this.httpClient.post(
      'professors',
      `/api/v1/professors/${professorId}/graduations/`,
      createDto,
    );
  }

  async updateGraduation(
    professorId: string,
    graduationId: string,
    updateDto: any,
  ) {
    // NOTE: DTO (updateDto) está sendo passado diretamente.
    return this.httpClient.put(
      'professors',
      `/api/v1/professors/${professorId}/graduations/${graduationId}`,
      updateDto,
    );
  }

  async deleteGraduation(professorId: string, graduationId: string) {
    return this.httpClient.delete(
      'professors',
      `/api/v1/professors/${professorId}/graduations/${graduationId}`,
    );
  }
}
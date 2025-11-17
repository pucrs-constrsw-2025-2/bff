import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { HttpClientService } from '../common/services/http-client.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PatchReservationDto } from './dto/patch-reservation.dto';
import { QueryReservationDto } from './dto/query-reservation.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);

  constructor(
    private readonly httpClient: HttpClientService,
    private readonly usersService: UsersService,
  ) {}

  async findAll(query: QueryReservationDto) {
    const params = new URLSearchParams();
    const q = query as Record<string, any>;
    Object.keys(q).forEach((key) => {
      if (q[key] !== undefined && q[key] !== null) {
        params.append(key, String(q[key]));
      }
    });

    const queryString = params.toString();
    const result = await this.httpClient.get(
      'reservations',
      `/api/v1/reservation${queryString ? `?${queryString}` : ''}`,
    );

    // Enrich the result with related entities (lesson, resource, users)
    if (Array.isArray(result)) {
      return Promise.all(result.map((r) => this.enrichReservation(r)));
    }

    // If result is paginated or wrapped, try to detect 'data' or 'items'
    if (result && Array.isArray((result as any).data)) {
      const enriched = await Promise.all((result as any).data.map((r: any) => this.enrichReservation(r)));
      return { ...result, data: enriched };
    }

    return this.enrichReservation(result);
  }

  async findOne(id: string) {
    const reservation = await this.httpClient.get('reservations', `/api/v1/reservation/${id}`);
    return this.enrichReservation(reservation);
  }

  async create(createDto: CreateReservationDto) {
    // validate referenced IDs before creating
    await this.validateReferences(createDto);
    return this.httpClient.post('reservations', '/api/v1/reservation', createDto);
  }

  async update(id: string, updateDto: UpdateReservationDto) {
    // validate referenced IDs before updating
    await this.validateReferences(updateDto);
    return this.httpClient.put('reservations', `/api/v1/reservation/${id}`, updateDto);
  }

  async remove(id: string) {
    return this.httpClient.delete('reservations', `/api/v1/reservation/${id}`);
  }

  async patch(id: string, patchDto: PatchReservationDto) {
    // validate referenced IDs before patching
    await this.validateReferences(patchDto);
    return this.httpClient.patch('reservations', `/api/v1/reservation/${id}`, patchDto);
  }

  private async validateReferences(dto: any) {
    if (!dto || typeof dto !== 'object') return;

    // Validate lesson_id
    if (dto.lesson_id) {
      try {
        await this.httpClient.get('lessons', `/api/v1/lessons/${dto.lesson_id}`);
      } catch (err: any) {
        if (err?.response?.status === 404) {
          throw new NotFoundException(`Lesson with id ${dto.lesson_id} not found`);
        }
        throw err;
      }
    }

    // Validate resource_id
    if (dto.resource_id) {
      try {
        await this.httpClient.get('resources', `/api/v1/resources/${dto.resource_id}`);
      } catch (err: any) {
        if (err?.response?.status === 404) {
          throw new NotFoundException(`Resource with id ${dto.resource_id} not found`);
        }
        throw err;
      }
    }

    // Validate authorized users
    if (Array.isArray(dto.authorizedUsers)) {
      for (const au of dto.authorizedUsers) {
        if (!au?.user_id) continue;
        try {
          // usersService.findOne already throws NotFoundException when user not found
          await this.usersService.findOne(au.user_id);
        } catch (err: any) {
          if (err instanceof NotFoundException) {
            throw new NotFoundException(`Authorized user with id ${au.user_id} not found`);
          }
          throw err;
        }
      }
    }
  }

  private async enrichReservation(reservation: any) {
    if (!reservation) return reservation;

    const enriched: any = { ...reservation };

    const lessonPromise = reservation.lesson_id
      ? this.httpClient.get('lessons', `/api/v1/lessons/${reservation.lesson_id}`).catch((err) => {
          this.logger.warn(`Lesson ${reservation.lesson_id} not found or error: ${err?.message}`);
          return null;
        })
      : Promise.resolve(null);

    const resourcePromise = reservation.resource_id
      ? this.httpClient.get('resources', `/api/v1/resources/${reservation.resource_id}`).catch((err) => {
          this.logger.warn(`Resource ${reservation.resource_id} not found or error: ${err?.message}`);
          return null;
        })
      : Promise.resolve(null);

    // Enrich authorized users (if present)
    if (Array.isArray(reservation.authorizedUsers) && reservation.authorizedUsers.length > 0) {
      const usersEnriched = await Promise.all(
        reservation.authorizedUsers.map(async (au: any) => {
          let user = null;
          try {
            user = await this.usersService.findOne(au.user_id);
          } catch (err: any) {
            // If user not found or other error, log and continue with null
            this.logger.warn(`Authorized user ${au.user_id} could not be fetched: ${err?.message}`);
            user = null;
          }
          return { ...au, user };
        }),
      );
      enriched.authorizedUsers = usersEnriched;
    }

    const [lesson, resource] = await Promise.all([lessonPromise, resourcePromise]);
    if (lesson) enriched.lesson = lesson;
    if (resource) enriched.resource = resource;

    return enriched;
  }
}


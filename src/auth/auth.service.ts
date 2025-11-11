import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../common/services/http-client.service';
import { LoginDto } from './dto/login.dto';
import { TokenResponseDto } from './dto/token-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpClient: HttpClientService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<TokenResponseDto> {
    try {
      const tokenEndpoint = this.configService.get<string>(
        'oauth.tokenEndpoint',
        '/api/v1/login',
      );

      const formData = new URLSearchParams();
      formData.append('username', loginDto.username);
      formData.append('password', loginDto.password);

      const response = await this.httpClient.post<TokenResponseDto>(
        'oauth',
        tokenEndpoint,
        formData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new UnauthorizedException('Credenciais inválidas');
      }
      throw error;
    }
  }

  async refresh(refreshToken: string): Promise<TokenResponseDto> {
    try {
      const tokenEndpoint = '/api/v1/refresh';

      const formData = new URLSearchParams();
      formData.append('refresh_token', refreshToken);

      const response = await this.httpClient.post<TokenResponseDto>(
        'oauth',
        tokenEndpoint,
        formData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new UnauthorizedException('Refresh token inválido ou expirado');
      }
      throw error;
    }
  }
}


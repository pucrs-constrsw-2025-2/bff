import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({ description: 'Access token JWT' })
  access_token: string;

  @ApiProperty({ description: 'Refresh token' })
  refresh_token: string;

  @ApiProperty({ description: 'Tempo de expiração em segundos' })
  expires_in: number;

  @ApiProperty({ description: 'Tipo do token', default: 'Bearer' })
  token_type: string;
}


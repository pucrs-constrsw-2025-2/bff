import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    const oauthIssuer = configService.get<string>('oauth.issuer') || 'http://localhost:8180';
    const jwksUri = configService.get<string>(
      'oauth.jwksUri',
      '/.well-known/jwks.json',
    ) || '/.well-known/jwks.json';

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${oauthIssuer}${jwksUri}`,
      }),
      audience: configService.get<string>('oauth.audience') || 'constrsw',
      issuer: oauthIssuer,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException('Token inválido');
    }

    return {
      userId: payload.sub,
      username: payload.preferred_username || payload.username,
      email: payload.email,
      roles: payload.realm_access?.roles || payload.roles || [],
    };
  }
}


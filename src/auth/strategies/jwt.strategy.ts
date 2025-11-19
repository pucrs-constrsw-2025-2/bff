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
    // Se o issuer contém '/realms/', então é o Keycloak e devemos usar o JWKS do Keycloak
    let jwksUri = configService.get<string>(
      'oauth.jwksUri',
      '/.well-known/jwks.json',
    ) || '/.well-known/jwks.json';
    
    // Se o issuer é do Keycloak, usar o endpoint correto do Keycloak
    if (oauthIssuer.includes('/realms/')) {
      jwksUri = '/protocol/openid-connect/certs';
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${oauthIssuer}${jwksUri}`,
      }),
      // Não validar audience aqui, vamos validar manualmente no validate()
      audience: false,
      issuer: oauthIssuer,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException('Token inválido');
    }

    // Validar audience manualmente: pode ser string ou array
    const expectedAudience = this.configService.get<string>('oauth.audience') || 'oauth';
    const tokenAud = payload.aud;
    const azp = payload.azp; // Authorized party (client ID)

    if (tokenAud) {
      if (Array.isArray(tokenAud)) {
        // Se audience é array, verificar se o client ID está na lista ou se azp corresponde
        if (!tokenAud.includes(expectedAudience) && azp !== expectedAudience) {
          throw new UnauthorizedException(`Token audience inválido. Esperado: ${expectedAudience}`);
        }
      } else if (typeof tokenAud === 'string') {
        // Se audience é string, deve corresponder ou azp deve corresponder
        if (tokenAud !== expectedAudience && azp !== expectedAudience) {
          throw new UnauthorizedException(`Token audience inválido. Esperado: ${expectedAudience}`);
        }
      }
    } else {
      // Se não há audience, verificar azp
      if (azp !== expectedAudience) {
        throw new UnauthorizedException(`Token sem audience válido. azp: ${azp}, esperado: ${expectedAudience}`);
      }
    }

    return {
      userId: payload.sub,
      username: payload.preferred_username || payload.username,
      email: payload.email,
      roles: payload.realm_access?.roles || payload.roles || [],
    };
  }
}


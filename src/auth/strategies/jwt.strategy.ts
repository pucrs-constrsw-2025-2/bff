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

    // Extrair roles de diferentes locais no token
    const roles: string[] = [];
    
    // Roles do realm
    if (payload.realm_access?.roles) {
      roles.push(...payload.realm_access.roles);
    }
    
    // Roles de recursos específicos (ex: oauth, account, etc.)
    if (payload.resource_access) {
      Object.values(payload.resource_access).forEach((resource: any) => {
        if (resource.roles && Array.isArray(resource.roles)) {
          roles.push(...resource.roles);
        }
      });
    }
    
    // Fallback para roles diretos no payload
    if (payload.roles && Array.isArray(payload.roles)) {
      roles.push(...payload.roles);
    }

    return {
      userId: payload.sub,
      username: payload.preferred_username || payload.username,
      email: payload.email,
      roles: [...new Set(roles)], // Remove duplicatas
    };
  }
}


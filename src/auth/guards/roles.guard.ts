import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    const userRoles = user.roles || [];
    
    // Verificar se o usuário tem pelo menos um dos roles necessários
    const hasRole = requiredRoles.some((role) => {
      // Verificar se o role está presente (case-insensitive)
      return userRoles.some(
        (userRole: string) =>
          userRole.toLowerCase() === role.toLowerCase() ||
          userRole.toLowerCase().includes(role.toLowerCase()) ||
          role.toLowerCase().includes(userRole.toLowerCase())
      );
    });

    if (!hasRole) {
      throw new ForbiddenException(
        `Acesso negado. Role(s) necessária(s): ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}


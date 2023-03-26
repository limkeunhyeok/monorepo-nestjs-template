import { Role } from '@common/modules/typeorm';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  mixin,
  Type,
} from '@nestjs/common';

export const AuthGurad = (roles: Role[]): Type<CanActivate> => {
  @Injectable()
  class RoleGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const { role } = request.user;
      const canRoles = roles;

      if (!canRoles?.length) {
        return true;
      }

      if (!canRoles.includes(role)) {
        throw new ForbiddenException('Access is denied');
      }

      return true;
    }
  }

  const guard = mixin(RoleGuard);
  return guard;
};

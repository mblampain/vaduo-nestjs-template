import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from './access-token.guard';
import { AUTH_GUARD_KEY } from '../decorators/auth.decorator';
import { PublicGuard } from './public.guard';

const PROTECTED_ROUTE = true;

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly publicGuard: PublicGuard,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isRouteProtected =
      this.reflector.getAllAndOverride<boolean>(AUTH_GUARD_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? PROTECTED_ROUTE;

    const guard = isRouteProtected ? this.accessTokenGuard : this.publicGuard;
    let error = new UnauthorizedException();
    const canActivate = await Promise.resolve(guard.canActivate(context)).catch(
      (err) => {
        error = err;
      },
    );

    if (canActivate) {
      return true;
    }
    throw error;
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class PublicGuard implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Because this guard is public, it will always return true
  public canActivate(context: ExecutionContext): boolean {
    return true;
  }
}

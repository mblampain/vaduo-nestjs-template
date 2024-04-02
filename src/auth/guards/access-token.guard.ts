import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwtConfig from '../jwt.config';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // Attach the content of the jwt to the request
      request.user = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // Extract the token from the Authorization header (Bearer XXX)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- We are only interested in the token
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import jwtConfig from './jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AuthService {
  public constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async login() {
    return this.jwtService.signAsync(
      {
        sub: randomUUID(),
        email: 'my-email@example.com',
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
  }
}

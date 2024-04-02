import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  public login() {
    return this.authService.login();
  }
}

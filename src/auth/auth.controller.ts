import { Controller, Post, Body } from '@nestjs/common';
import { User } from 'src/types/user';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() req: User) {
    return this.authService.login(req);
  }
}

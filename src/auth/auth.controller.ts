import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  userRegister(@Body() body) {
    this.authService.userRegister(body);
    return body;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getUsers() {
    return this.authService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param() id) {
    return this.authService.getUserById(id);
  }
}

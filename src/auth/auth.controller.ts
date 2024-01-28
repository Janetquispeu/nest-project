import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/types/user';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  userRegister(@Res() res, @Body() body) {
    this.authService.userRegister(res, body);
    return body;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getUsers(@Res() res) {
    return this.authService.getUsers(res);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Res() res, @Param() id) {
    return this.authService.getUserById(res, id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUserById(@Param('id') id, @Body() body: User, @Request() req) {
    return await this.authService.updateUserById(id, body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(@Param('id') id, @Request() req) {
    return await this.authService.deleteById(id, req.user);
  }
}

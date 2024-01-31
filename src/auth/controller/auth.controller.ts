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
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/types/user';
import { AuthService } from '../service/auth.service';
import { CreateUserRegisterDto } from '../dto/create-user-register';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { LocalAuthGuard } from '../local-auth.guard';

@ApiTags('Users')
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 200, description: 'El usuario ha sido creado satisfactoriamente.'})
  @ApiBody({ type: CreateUserRegisterDto })
  @Post('')
  userRegister(@Res() res, @Body() body: CreateUserRegisterDto) {
    this.authService.userRegister(res, body);
    return body;
  }

  @ApiResponse({ status: 200, description: 'ok'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Se obtuvo los usuarios correctamente.'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(JwtAuthGuard)
  @Get('')
  getUsers(@Res() res) {
    return this.authService.getUsers(res);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'ok'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Res() res, @Param() id, @Request() req) {
    return await this.authService.getUserById(res, id, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Se actualizó el usuario correctamente.'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateUserRegisterDto })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUserById(@Param('id') id, @Body() body: User, @Request() req) {
    return await this.authService.updateUserById(id, body, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Se eliminó el usuario correctamente.'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({ status: 403, description: 'Acceso denegado. No eres un administrador.'})
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteById(@Param('id') id) {
    return await this.authService.deleteById(id);
  }
}

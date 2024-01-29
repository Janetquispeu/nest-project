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
import { AuthService } from './auth.service';
import { CreateUserRegisterDto } from './dto/create-user-register';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Users')
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 200, description: 'ok'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
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
  @ApiResponse({ status: 200, description: 'ok'})
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
  getUserById(@Res() res, @Param() id) {
    return this.authService.getUserById(res, id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'ok'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiParam({ name: 'id' })
  @ApiBody({ type: CreateUserRegisterDto })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUserById(@Param('id') id, @Body() body: User, @Request() req) {
    return await this.authService.updateUserById(id, body, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'ok'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(@Param('id') id, @Request() req) {
    return await this.authService.deleteById(id, req.user);
  }
}

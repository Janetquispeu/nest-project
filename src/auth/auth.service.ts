import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from 'src/types/user';
import { JwtService } from '@nestjs/jwt';
import { CreateUserRegisterDto } from './dto/create-user-register';
import { InjectModel } from '@nestjs/mongoose';
import { Register } from './schema/auth.schema';

@Injectable()
export class AuthService {
  testUser: User;

  constructor(
    private jwtService: JwtService,
    @InjectModel(Register.name) private registerModel: Model<Register>,
  ) {
    this.testUser = {
      userName: 'janet1993',
      password: '123',
    };
  }

  validateUser(username: string, password: string): any {
    if (this.testUser.userName === username && this.testUser.password === password ) {
      return {
        name: this.testUser.userName,
        password: this.testUser.password,
      };
    }
  }

  login(user: User) {
    const payload = {
      username: user.userName,
      password: user.password,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async userRegister(createUserRegisterDto: CreateUserRegisterDto) {
    console.log(createUserRegisterDto, 'createUserRegisterDto');
    const createdUser = new this.registerModel(createUserRegisterDto);
    return createdUser.save();
  }
}

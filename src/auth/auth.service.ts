import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from 'src/types/user';
import { JwtService } from '@nestjs/jwt';
import { CreateUserRegisterDto } from './dto/create-user-register';
import { InjectModel } from '@nestjs/mongoose';
import { Register } from './schema/auth.schema';
import { LoginUserDto } from './dto/login-user';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Register.name) private registerModel: Model<Register>,
  ) {}

  async findUserByUsername(username: string): Promise<any | null> {
    return this.registerModel.findOne({ username }).exec();
  }

  async validateUser(username: string, password: string) {
    const user = await this.findUserByUsername(username);

    return user;
  }

  login(user: LoginUserDto) {
    const payload = {
      username: user.username,
      password: user.password,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async userRegister(
    createUserRegisterDto: CreateUserRegisterDto,
  ): Promise<Register> {
    const createdUser = new this.registerModel(createUserRegisterDto);
    return createdUser.save();
  }

  async getUsers(): Promise<Register[]> {
    return this.registerModel.find().exec();
  }

  async getUserById(params: { id: string }): Promise<Register> {
    return this.registerModel.findById(params.id).lean();
  }
}

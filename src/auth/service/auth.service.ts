import { Model } from 'mongoose';
import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserRegisterDto } from '../dto/create-user-register';
import { InjectModel } from '@nestjs/mongoose';
import { Register } from '../schema/auth.schema';
import { LoginUserDto } from '../dto/login-user';

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
      isAdmin: user.isAdmin,
      id: user._id.toString()
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async addUser(createUserDTO: CreateUserRegisterDto): Promise<Register> {
    const newUser = new this.registerModel(createUserDTO);
    return newUser.save();
  }

  async doesUserExists(createUserRegisterDto: CreateUserRegisterDto): Promise<boolean> {
    const user = await this.registerModel.findOne({ username: createUserRegisterDto.username });
    if(user?.username){
      return true;
    }
    return false;
  }

  async userRegister(
    res,
    createUserRegisterDto: CreateUserRegisterDto,
  ): Promise<Register> {
    if(await this.doesUserExists(createUserRegisterDto)){
      return res.status(HttpStatus.OK).json({
        message: "User already exists"
      });
    }
    const user = await this.addUser(createUserRegisterDto);
    return res.status(HttpStatus.OK).json({
      message: "El usuario ha sido creado satisfactoriamente.",
      user
    });
  }

  async getUsers(res): Promise<Register[]> {
    const users = await this.registerModel.find().exec();

    return res.status(HttpStatus.OK).json({
      data: users,
      message: "Se obtuvo los usuarios correctamente."
    });
  }

  async getUserById(res, params: { id: string }, req): Promise<Register> {
    let data = {};
    const findUser = await this.registerModel.findOne({ username: req.username }).exec();
    const isAdmin = findUser.isAdmin;
    const user = await this.registerModel.findOne({ _id: params.id }).exec();

    if (isAdmin) {
      if(!user) {
        data = { message: "User does not exists" };
      } else {
        data = { user }
      }

      return res.status(HttpStatus.OK).json({
        data
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  async updateUserById(id, body, req): Promise<Register> {
    const existsId = await this.registerModel.findById(id);

    if(existsId) {
      const findUser = await this.registerModel.findOne({ username: req.username }).exec();
      const user = findUser._id.toString() === id || findUser.isAdmin;

      if (user) {
        return await this.registerModel.findByIdAndUpdate({ _id: id }, body, { new: true });
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async deleteById(id: string) {
    const user = await this.registerModel.findByIdAndDelete({ _id: id }).lean();
    
    return {
      message: 'Se eliminó el usuario correctamente.',
      data: user
    }
  }
}

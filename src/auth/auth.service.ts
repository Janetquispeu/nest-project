import { Injectable } from '@nestjs/common';
import { User } from 'src/types/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  testUser: Partial<User>;

  constructor(private jwtService: JwtService) {
    this.testUser = {
      user: 'janet1993',
      password: '123',
    };
  }

  validateUser(username: string, password: string): any {
    if (this.testUser.user == username && this.testUser.password === password ) {
      return {
        name: this.testUser.user,
        password: this.testUser.password,
      };
    }
  }

  login(user: User) {
    const payload = {
      user: user.user,
      password: user.password,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

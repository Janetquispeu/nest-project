import { Injectable } from '@nestjs/common';
import { User } from 'src/types/user';

@Injectable()
export class AuthService {
  login(user: User) {
    const payload = {
      name: user.name,
      mail: user.mail,
      lastName: user.lastName,
      birthday: user.birthday,
      age: user.age,
      gender: user.gender,
      role: user.role,
    };

    return payload;
  }
}

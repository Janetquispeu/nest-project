import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { Register } from '../schema/auth.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtServiceMock: JwtService;
  let registerModelMock: Model<Register>;

  const mockAuthService = {
    findOne: jest.fn(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
        }),
      ],
      providers: [
        AuthService, {
        provide: getModelToken(Register.name),
        useValue: mockAuthService
      }],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtServiceMock = module.get<JwtService>(JwtService);
    registerModelMock = module.get(getModelToken(Register.name));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});

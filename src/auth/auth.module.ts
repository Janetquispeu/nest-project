import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { jwtConstant } from './jwt.constant';
import { Register, RegisterSchema } from './schema/auth.schema';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    MongooseModule.forFeature([
      { name: Register.name, schema: RegisterSchema },
    ]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

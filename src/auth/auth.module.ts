import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { Register, RegisterSchema } from './schema/auth.schema';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: '$P4L4bR45Up3RS3CR3T4%',
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

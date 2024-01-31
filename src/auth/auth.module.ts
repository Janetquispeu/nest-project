import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import * as passport from 'passport';
import { AuthService } from './service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AdminMiddleware } from 'src/middleware/admin';
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

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(passport.authenticate('jwt', { session: false })) // Utiliza la estrategia de autenticación deseada
    .forRoutes('users/delete/*');

    consumer
    .apply(AdminMiddleware)
    .forRoutes('users/delete/*');
  }
}

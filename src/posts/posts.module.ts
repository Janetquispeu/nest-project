import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import * as passport from 'passport';
import { JwtModule } from '@nestjs/jwt';
import { PostsService } from './service/posts.service';
import { Posts, PostsSchema } from './schema/post.schema';
import { jwtConstant } from 'src/auth/jwt.constant';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { Register, RegisterSchema } from 'src/auth/schema/auth.schema';
import { AdminMiddleware } from 'src/middleware/admin';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    MongooseModule.forFeature([
      { name: Posts.name, schema: PostsSchema },
      { name: Register.name, schema: RegisterSchema },
    ]),
  ],
  providers: [PostsService, JwtStrategy],
  exports: [PostsService],
})

export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(passport.authenticate('jwt', { session: false })) // Utiliza la estrategia de autenticación deseada
    .forRoutes('posts/admin/*');

    consumer
    .apply(AdminMiddleware)
    .forRoutes('posts/admin/*');
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PostsService } from './posts.service';
import { Posts, PostsSchema } from './schema/post.schema';
import { jwtConstant } from 'src/auth/jwt.constant';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { Register, RegisterSchema } from 'src/auth/schema/auth.schema';

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
export class PostsModule {}

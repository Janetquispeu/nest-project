import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/controller/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import configuration from './config';
import { PostsController } from './posts/controller/posts.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    AuthModule,
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('db'),
      inject: [ConfigService],
    }),
    PostsModule,
  ],
  controllers: [AppController, AuthController, PostsController],
  providers: [AppService],
})

export class AppModule {}

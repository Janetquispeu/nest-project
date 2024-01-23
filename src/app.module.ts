import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import configuration from './config';
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
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}

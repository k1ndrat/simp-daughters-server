import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EpisodeModule } from './episode/episode.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { FacebookAuthModule } from './facebook-auth/facebook-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UserModule,
    EpisodeModule,
    GoogleAuthModule,
    FacebookAuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

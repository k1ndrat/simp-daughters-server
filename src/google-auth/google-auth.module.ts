import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';
import { GoogleStrategy } from './google-auth.strategy';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.model';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [GoogleAuthController],
  providers: [
    GoogleAuthService,
    GoogleStrategy,
    UserService,
    AuthService,
    JwtService,
  ],
})
export class GoogleAuthModule {}

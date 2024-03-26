import { Module } from '@nestjs/common';
import { FacebookAuthController } from './facebook-auth.controller';
import { FacebookAuthService } from './facebook-auth.service';
import { FacebookStrategy } from './facebook-auth.strategy';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [FacebookAuthController],
  providers: [
    FacebookAuthService,
    FacebookStrategy,
    UserService,
    AuthService,
    JwtService,
  ],
})
export class FacebookAuthModule {}

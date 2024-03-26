import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FacebookAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async facebookLogin(req) {
    if (!req.user) {
      return 'No user from facebook';
    }

    let user = await this.userService.findByEmail(req.user.email);

    if (!user) {
      user = await this.userService.createUser({
        name: req.user.firstName + ' ' + req.user.lastName,
        email: req.user.email,
        password: 'FacebookPassword',
      });
    }

    return await this.authService.generateTokens(user);
  }
}

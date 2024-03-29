import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    let user = await this.userService.findByEmail(req.user.email);

    if (!user) {
      user = await this.userService.createUser({
        name: req.user.firstName + ' ' + req.user.lastName,
        email: req.user.email,
        picture: req.user.picture,
        password: 'GooglePassword',
      });
    }

    if (!user?.picture) {
      console.log('no picture');
      console.log(user._id);

      user = await this.userService.updateUser(user._id, {
        picture: req.user.picture,
      });
    }

    return await this.authService.generateTokens(user);
  }
}

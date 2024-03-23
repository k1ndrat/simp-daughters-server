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

    // console.log({
    //   message: 'User information from google',
    //   user: req.user,
    // });

    let user = await this.userService.findByEmail(req.user.email);
    if (!user) {
      user = await this.userService.createUser({
        name: req.user.firstName + ' ' + req.user.lastName,
        email: req.user.email,
        password: 'GooglePassword',
      });
    }
    return this.authService.generateTokens(user);
  }
}

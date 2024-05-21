import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { Response } from 'express';

// const EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000;
const EXPIRE_TIME = 5 * 60 * 1000; // access token expiring time

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto, res: Response) {
    const user = await this.validateUser(dto);

    return await this.generateTokens(user, res);
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (user?.authStrategy === 'google')
      throw new UnauthorizedException('This account is registered with google');

    if (user && (await compare(dto.password, user.password))) {
      const { password, ...res } = user;
      return res;
    }

    throw new UnauthorizedException('Wrong login or password');
  }

  async generateTokens(user: any, res: Response) {
    const payload = {
      username: user.email,
      sub: {
        id: user._id,
        name: user.name,
      },
    };
    //
    const { password, ...userinfo } = user;

    const tokens = {
      user: userinfo,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '5m',
        secret: process.env.ACCESS_TOKEN_SECRET,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.REFRESH_TOKEN_SECRET,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };

    res.cookie('jwt', tokens.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // signed: true,
      // domain: process.env.CLIENT_DOMAIN as string,
      // sameSite: 'none',
      secure: true,
    });

    return tokens;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    // const payload = {
    //   username: user.email,
    //   sub: {
    //     id: user._id,
    //     name: user.name,
    //   },
    // };

    // return {
    //   user,
    //   accessToken: await this.jwtService.signAsync(payload, {
    //     expiresIn: '70d',
    //     secret: process.env.ACCESS_TOKEN_SECRET,
    //   }),
    //   refreshToken: await this.jwtService.signAsync(payload, {
    //     expiresIn: '70d',
    //     secret: process.env.REFRESH_TOKEN_SECRET,
    //   }),
    // };

    return await this.generateTokens(user);
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (user && (await compare(dto.password, user.password))) {
      const { password, ...res } = user;
      return res;
    }

    throw new UnauthorizedException('Wrong login or password');
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '70d',
        secret: process.env.ACCESS_TOKEN_SECRET,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '70d',
        secret: process.env.REFRESH_TOKEN_SECRET,
      }),
      // expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  async generateTokens(user: any) {
    const payload = {
      username: user.email,
      sub: {
        id: user._id,
        name: user.name,
      },
    };

    const { password, ...userinfo } = user;

    return {
      user: userinfo,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '70d',
        secret: process.env.ACCESS_TOKEN_SECRET,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '70d',
        secret: process.env.REFRESH_TOKEN_SECRET,
      }),
    };
  }
}

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // console.log(request.headers.authorization);
    let token;
    try {
      token = request.headers.authorization.split(' ')[1];
    } catch {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      request.user = payload;
    } catch {
      // throw new UnauthorizedException();
      throw new ForbiddenException();
    }

    return true;
  }
}

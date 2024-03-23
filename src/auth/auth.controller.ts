import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @HttpCode(200)
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    const user = await this.userService.findByEmail(req.user.username);

    return await this.authService.generateTokens(user);
  }
}

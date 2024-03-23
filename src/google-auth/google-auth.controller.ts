import { Controller, Get, Req, Res, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './google-auth.service';

@Controller('google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const tokens = await this.googleAuthService.googleLogin(req);

    res.cookie('tokens', JSON.stringify(tokens), {
      domain: process.env.CLIENT_DOMAIN,
    });

    res.redirect(process.env.CLIENT_BASE_URL);
  }
}

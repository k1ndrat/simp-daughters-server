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
  async googleAuthRedirect(@Req() req, @Res() res, @Headers() headers) {
    const tokens = await this.googleAuthService.googleLogin(req);

    // console.log(tokens);

    console.log(headers.host);

    res.cookie('tokens', JSON.stringify(tokens), {
      domain: headers.host.split(':')[0],
    });

    // console.log(res);

    res.redirect(process.env.CLIENT_BASE_URL);
  }
}

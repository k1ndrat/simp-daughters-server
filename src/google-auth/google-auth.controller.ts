import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './google-auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('GoogleAuth')
@Controller('google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const tokens: any = await this.googleAuthService.googleLogin(req);

    res.redirect(
      `${process.env.CLIENT_BASE_URL}?tokens=${JSON.stringify(tokens)}`,
    );
  }
}

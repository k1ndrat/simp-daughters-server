import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FacebookAuthService } from './facebook-auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('FacebookAuth')
@Controller('facebook')
export class FacebookAuthController {
  constructor(private readonly facebookAuthService: FacebookAuthService) {}

  @Get()
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req, @Res() res): Promise<any> {
    // return {
    //   statusCode: HttpStatus.OK,
    //   data: req.user,
    // };

    const tokens: any = await this.facebookAuthService.facebookLogin(req);

    res.redirect(
      `${process.env.CLIENT_BASE_URL}?tokens=${JSON.stringify(tokens)}`,
    );
  }
}

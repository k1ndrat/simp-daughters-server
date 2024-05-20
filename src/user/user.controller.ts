import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Types } from 'mongoose';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RefreshJwtGuard } from 'src/auth/guards/refresh.guard';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RefreshJwtGuard)
  @Get('/me')
  async getAuthUser(@Req() req) {
    return await this.userService.findByEmail(req.user.username);
  }

  @ApiOperation({
    summary: 'Get user',
  })
  @ApiOkResponse({
    description: 'Get user info',
    schema: {
      type: 'object',
      example: {
        email: 'haker0@ukr.net',
        name: 'k1ndrat1',
        _id: '660d1390c7ea8111b505abf3',
        createdAt: '2024-04-03T08:30:08.626Z',
        updatedAt: '2024-04-03T08:30:08.626Z',
        __v: 0,
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Please use token!' })
  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: Types.ObjectId) {
    return await this.userService.findById(id);
  }
}

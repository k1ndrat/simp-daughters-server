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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'User registration',
  })
  @ApiCreatedResponse({
    description: 'User is created',
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
  @ApiConflictResponse({
    description: 'An account with this email already exists',
  })
  @ApiBadRequestResponse({ description: 'Please write right body as dto' })
  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @ApiOperation({
    summary: 'User login',
  })
  @ApiOkResponse({
    description: 'User is logined',
    schema: {
      type: 'object',
      example: {
        user: {
          _id: '660d1390c7ea8111b505abf3',
          email: 'haker0@ukr.net',
          name: 'k1ndrat1',
          createdAt: '2024-04-03T08:30:08.626Z',
          updatedAt: '2024-04-03T08:30:08.626Z',
          __v: 0,
        },
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imhha2VyMEB1a3IubmV0Iiwic3ViIjp7ImlkIjoiNjYwZDEzOTBjN2VhODExMWI1MDVhYmYzIiwibmFtZSI6ImsxbmRyYXQxIn0sImlhdCI6MTcxMjEzMzE3MiwiZXhwIjoxNzEyMTMzNDcyfQ.eaQBlpdsi31EEyxVLpoaspXauqAIoSCjI2gb-3C7A7M',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imhha2VyMEB1a3IubmV0Iiwic3ViIjp7ImlkIjoiNjYwZDEzOTBjN2VhODExMWI1MDVhYmYzIiwibmFtZSI6ImsxbmRyYXQxIn0sImlhdCI6MTcxMjEzMzE3MiwiZXhwIjoxNzEyNzM3OTcyfQ.qTXgime0B77cX-q-Xs6gly7TDvqReRfJZCFAB35KESk',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Wrong login or password' })
  @ApiBadRequestResponse({ description: 'Please write right body as dto' })
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @ApiOperation({
    summary: 'Refresh tokens',
  })
  @ApiCreatedResponse({
    description: 'Tokens are refreshed',
    schema: {
      type: 'object',
      example: {
        user: {
          _id: '660d1390c7ea8111b505abf3',
          email: 'haker0@ukr.net',
          name: 'k1ndrat1',
          createdAt: '2024-04-03T08:30:08.626Z',
          updatedAt: '2024-04-03T08:30:08.626Z',
          __v: 0,
        },
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imhha2VyMEB1a3IubmV0Iiwic3ViIjp7ImlkIjoiNjYwZDEzOTBjN2VhODExMWI1MDVhYmYzIiwibmFtZSI6ImsxbmRyYXQxIn0sImlhdCI6MTcxMjEzMzI4NiwiZXhwIjoxNzEyMTMzNTg2fQ.E7I62VmyAgf9pBVQuxnIJ8JwU3Msp6Qlx6vuMb6Be98',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imhha2VyMEB1a3IubmV0Iiwic3ViIjp7ImlkIjoiNjYwZDEzOTBjN2VhODExMWI1MDVhYmYzIiwibmFtZSI6ImsxbmRyYXQxIn0sImlhdCI6MTcxMjEzMzI4NiwiZXhwIjoxNzEyNzM4MDg2fQ.bKaKJAP7zwom-Ka1eeola4LFdjLhdonVNHrBniAxnxE',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Wrong token' })
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    const user = await this.userService.findByEmail(req.user.username);

    return await this.authService.generateTokens(user);
  }
}

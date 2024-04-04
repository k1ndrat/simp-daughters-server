import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Types } from 'mongoose';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { StateDto } from './dto/state.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Episode')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @ApiOperation({
    summary: 'Get all episodes with state',
  })
  @ApiOkResponse({
    description: 'All episodes with state',
    schema: {
      type: 'object',
      example: {
        '1': [
          {
            _id: '64d64601216a3eb1e870af0c',
            episode: 1,
            season: 1,
            title: 'СІМПСОНИ ГОТУЮТЬ НА ВІДКРИТОМУ ВОГНІ',
            link: 'https://simpsonsua.tv/sezon-1/53-1-sezon-1-seriya.html',
            state: {
              isForLater: true,
              isLiked: false,
              isWatched: false,
            },
          },
          {
            _id: '64d64601216a3eb1e870af0d',
            episode: 2,
            season: 1,
            title: 'БАРТ ГЕНІЙ',
            link: 'https://simpsonsua.tv/sezon-1/54-1-sezon-2-seriya.html',
          },
        ],
        '2': [
          {
            _id: '64d64601216a3eb1e870aef6',
            episode: 1,
            season: 2,
            title: 'БАРТ ОТРИМУЄ ДВІЙКУ',
            link: 'https://simpsonsua.tv/sezon-2/67-2-sezon-1-seriya.html',
          },
          {
            _id: '64d64601216a3eb1e870aef7',
            episode: 2,
            season: 2,
            title: 'СІМПСОН І ДАЛІЛА',
            link: 'https://simpsonsua.tv/sezon-2/68-2-sezon-2-seriya.html',
          },
        ],
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Please use token!' })
  @Get()
  async findAllEpisodes(@Request() req) {
    return await this.episodeService.getEpisodesWithStates(req.user.sub.id);
  }

  @ApiOperation({
    summary: 'Get all liked episodes with state',
  })
  @ApiOkResponse({
    description: 'All liked episodes with state',
    schema: {
      type: 'object',
      example: {
        '1': [
          {
            _id: '64d64601216a3eb1e870af0c',
            episode: 1,
            season: 1,
            title: 'СІМПСОНИ ГОТУЮТЬ НА ВІДКРИТОМУ ВОГНІ',
            link: 'https://simpsonsua.tv/sezon-1/53-1-sezon-1-seriya.html',
            state: {
              isForLater: false,
              isLiked: true,
              isWatched: false,
            },
          },
          {
            _id: '64d64601216a3eb1e870af0d',
            episode: 2,
            season: 1,
            title: 'БАРТ ГЕНІЙ',
            link: 'https://simpsonsua.tv/sezon-1/54-1-sezon-2-seriya.html',
            state: {
              isForLater: false,
              isLiked: true,
              isWatched: false,
            },
          },
        ],
        '2': [
          {
            _id: '64d64601216a3eb1e870aef6',
            episode: 1,
            season: 2,
            title: 'БАРТ ОТРИМУЄ ДВІЙКУ',
            link: 'https://simpsonsua.tv/sezon-2/67-2-sezon-1-seriya.html',
            state: {
              isForLater: false,
              isLiked: true,
              isWatched: false,
            },
          },
          {
            _id: '64d64601216a3eb1e870aef7',
            episode: 2,
            season: 2,
            title: 'СІМПСОН І ДАЛІЛА',
            link: 'https://simpsonsua.tv/sezon-2/68-2-sezon-2-seriya.html',
            state: {
              isForLater: false,
              isLiked: true,
              isWatched: false,
            },
          },
        ],
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Please use token!' })
  @Get('/liked')
  async findLikedEpisodes(@Request() req) {
    return await this.episodeService.getEpisodesWithSpecialState(
      req.user.sub.id,
      'isLiked',
    );
  }

  @ApiOperation({
    summary: 'Get all on later episodes with state',
  })
  @ApiOkResponse({
    description: 'All on later episodes with state',
    schema: {
      type: 'object',
      example: {
        '1': [
          {
            _id: '64d64601216a3eb1e870af0c',
            episode: 1,
            season: 1,
            title: 'СІМПСОНИ ГОТУЮТЬ НА ВІДКРИТОМУ ВОГНІ',
            link: 'https://simpsonsua.tv/sezon-1/53-1-sezon-1-seriya.html',
            state: {
              isForLater: true,
              isLiked: false,
              isWatched: false,
            },
          },
          {
            _id: '64d64601216a3eb1e870af0d',
            episode: 2,
            season: 1,
            title: 'БАРТ ГЕНІЙ',
            link: 'https://simpsonsua.tv/sezon-1/54-1-sezon-2-seriya.html',
            state: {
              isForLater: true,
              isLiked: false,
              isWatched: false,
            },
          },
        ],
        '2': [
          {
            _id: '64d64601216a3eb1e870aef6',
            episode: 1,
            season: 2,
            title: 'БАРТ ОТРИМУЄ ДВІЙКУ',
            link: 'https://simpsonsua.tv/sezon-2/67-2-sezon-1-seriya.html',
            state: {
              isForLater: true,
              isLiked: false,
              isWatched: false,
            },
          },
          {
            _id: '64d64601216a3eb1e870aef7',
            episode: 2,
            season: 2,
            title: 'СІМПСОН І ДАЛІЛА',
            link: 'https://simpsonsua.tv/sezon-2/68-2-sezon-2-seriya.html',
            state: {
              isForLater: true,
              isLiked: false,
              isWatched: false,
            },
          },
        ],
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Please use token!' })
  @Get('/onlater')
  async findWatchedEpisodes(@Request() req) {
    return await this.episodeService.getEpisodesWithSpecialState(
      req.user.sub.id,
      'isForLater',
    );
  }

  // @Post('like/:episodeId')
  // @HttpCode(HttpStatus.OK)
  // async likeEpisode(
  //   @Request() req,
  //   @Param('episodeId', IdValidationPipe) episodeId: Types.ObjectId,
  // ) {
  //   return await this.episodeService.toggleStateEpisode(
  //     req.user.sub.id,
  //     episodeId,
  //     'like',
  //   );
  // }

  // @Post('watch/:episodeId')
  // @HttpCode(HttpStatus.OK)
  // async watchEpisode(
  //   @Request() req,
  //   @Param('episodeId', IdValidationPipe) episodeId: Types.ObjectId,
  // ) {
  //   return await this.episodeService.toggleStateEpisode(
  //     req.user.sub.id,
  //     episodeId,
  //     'watch',
  //   );
  // }

  // @Post('forLater/:episodeId')
  // @HttpCode(HttpStatus.OK)
  // async forLaterEpisode(
  //   @Request() req,
  //   @Param('episodeId', IdValidationPipe) episodeId: Types.ObjectId,
  // ) {
  //   return await this.episodeService.toggleStateEpisode(
  //     req.user.sub.id,
  //     episodeId,
  //     'forLater',
  //   );
  // }

  @ApiOperation({
    summary: 'Change episode state',
  })
  @ApiOkResponse({
    description: 'Change episode state',
    schema: {
      type: 'object',
      example: {
        _id: '660d173944d61928ef7e6bfc',
        episodeId: '64d64601216a3eb1e870aca4',
        userId: '660d1390c7ea8111b505abf3',
        state: {
          isWatched: true,
          isLiked: true,
          isForLater: true,
        },
        createdAt: '2024-04-03T08:45:45.018Z',
        updatedAt: '2024-04-03T08:47:28.532Z',
        __v: 0,
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Please use token!' })
  @ApiBadRequestResponse({ description: 'Please write right body as dto' })
  @Post('state/:episodeId')
  @HttpCode(HttpStatus.OK)
  async setNewState(
    @Request() req,
    @Param('episodeId', IdValidationPipe) episodeId: Types.ObjectId,
    @Body() state: StateDto,
  ) {
    return await this.episodeService.setNewState(
      state,
      req.user.sub.id,
      episodeId,
    );
  }
}

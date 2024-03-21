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

@UseGuards(JwtGuard)
@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get()
  async findAllEpisodes(@Request() req) {
    return await this.episodeService.getEpisodesWithStates(req.user.sub.id);
  }

  @Get('/liked')
  async findLikedEpisodes(@Request() req) {
    return await this.episodeService.getEpisodesWithSpecialState(
      req.user.sub.id,
      'isLiked',
    );
  }

  @Get('/onlater')
  async findWatchedEpisodes(@Request() req) {
    return await this.episodeService.getEpisodesWithSpecialState(
      req.user.sub.id,
      'isForLater',
    );
  }

  @Post('like/:episodeId')
  @HttpCode(HttpStatus.OK)
  async likeEpisode(
    @Request() req,
    @Param('episodeId', IdValidationPipe) episodeId: Types.ObjectId,
  ) {
    return await this.episodeService.toggleStateEpisode(
      req.user.sub.id,
      episodeId,
      'like',
    );
  }

  @Post('watch/:episodeId')
  @HttpCode(HttpStatus.OK)
  async watchEpisode(
    @Request() req,
    @Param('episodeId', IdValidationPipe) episodeId: Types.ObjectId,
  ) {
    return await this.episodeService.toggleStateEpisode(
      req.user.sub.id,
      episodeId,
      'watch',
    );
  }

  @Post('forLater/:episodeId')
  @HttpCode(HttpStatus.OK)
  async forLaterEpisode(
    @Request() req,
    @Param('episodeId', IdValidationPipe) episodeId: Types.ObjectId,
  ) {
    return await this.episodeService.toggleStateEpisode(
      req.user.sub.id,
      episodeId,
      'forLater',
    );
  }

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

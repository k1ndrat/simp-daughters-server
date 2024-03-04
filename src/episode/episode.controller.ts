import {
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

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get()
  @UseGuards(JwtGuard)
  async findAllEpisodes(@Request() req) {
    return await this.episodeService.getEpisodesWithStates(req.user.sub.id);
  }

  @Post('like/:episodeId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
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
  @UseGuards(JwtGuard)
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
  @UseGuards(JwtGuard)
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
}

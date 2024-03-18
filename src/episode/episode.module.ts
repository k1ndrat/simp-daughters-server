import { Module } from '@nestjs/common';
import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';
import { JwtService } from '@nestjs/jwt';
import { Episode, EpisodeSchema } from './episode.model';
import { EpisodeState, EpisodeStateSchema } from './episode-state.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Episode.name, schema: EpisodeSchema },
      { name: EpisodeState.name, schema: EpisodeStateSchema },
    ]),
  ],
  controllers: [EpisodeController],
  providers: [EpisodeService, JwtService],
})
export class EpisodeModule {}

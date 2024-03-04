import { Module } from '@nestjs/common';
import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';
import { EpisodeModel } from './episode.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtService } from '@nestjs/jwt';
import { EpisodeStateModel } from './episode-state.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: EpisodeModel,
        schemaOptions: {
          collection: 'episodes',
        },
      },
      {
        typegooseClass: EpisodeStateModel,
        schemaOptions: {
          collection: 'EpisodeStates',
        },
      },
    ]),
  ],
  controllers: [EpisodeController],
  providers: [EpisodeService, JwtService],
})
export class EpisodeModule {}

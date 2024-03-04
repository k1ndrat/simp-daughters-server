import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { EpisodeModel } from './episode.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { EpisodeStateModel } from './episode-state.model';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectModel(EpisodeModel)
    private readonly episodeModel: ModelType<EpisodeModel>,
    @InjectModel(EpisodeStateModel)
    private readonly episodeStateModel: ModelType<EpisodeStateModel>,
  ) {}

  async getAllEpisodes() {
    return await this.episodeModel.find();
  }

  async getEpisodesWithStates(userId: Types.ObjectId) {
    const convertedUserId = new Types.ObjectId(userId);
    const episodes = await this.episodeModel.aggregate([
      {
        $lookup: {
          from: 'EpisodeStates',
          localField: '_id',
          foreignField: 'episodeId',
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$userId', convertedUserId] },
              },
            },
          ],
          as: 'episodeState',
        },
      },
      {
        $addFields: {
          state: { $arrayElemAt: ['$episodeState.state', 0] },
        },
      },
      {
        $project: {
          season: 1,
          episode: 1,
          title: 1,
          link: 1,
          state: 1,
        },
      },
    ]);

    const result = {};
    episodes.forEach((episode) => {
      if (!result[episode.season]) {
        result[episode.season] = [];
      }
      result[episode.season].push(episode);
      result[episode.season].sort((a, b) => a.episode - b.episode);
    });

    return result;
  }

  async toggleStateEpisode(
    userId: Types.ObjectId,
    episodeId: Types.ObjectId,
    type: string,
  ) {
    const episodeState = await this.episodeStateModel.findOne({
      userId,
      episodeId,
    });

    if (episodeState) {
      return await this.episodeStateModel.findOneAndUpdate(
        {
          userId,
          episodeId,
        },
        {
          state: {
            isLiked:
              type === 'like'
                ? !episodeState.state.isLiked
                : episodeState.state.isLiked,
            isWatched:
              type === 'watch'
                ? !episodeState.state.isWatched
                : episodeState.state.isWatched,
            isForLater:
              type === 'forLater'
                ? !episodeState.state.isForLater
                : episodeState.state.isForLater,
          },
        },
        { new: true },
      );
    }

    return await this.episodeStateModel.create({
      userId,
      episodeId,
      state: {
        isLiked: type === 'like',
        isWatched: type === 'watch',
        isForLater: type === 'forLater',
      },
    });
  }
}

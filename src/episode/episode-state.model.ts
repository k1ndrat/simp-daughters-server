import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { EpisodeModel } from './episode.model';
import { UserModel } from 'src/user/user.model';

export interface EpisodeStateModel extends Base {}

class State {
  @prop({ default: false })
  isLiked: boolean;

  @prop({ default: false })
  isWatched: boolean;

  @prop({ default: false })
  isForLater: boolean;
}

export class EpisodeStateModel extends TimeStamps {
  @prop({ ref: () => EpisodeModel })
  episodeId: Types.ObjectId;
  // episodeId: Ref<EpisodeModel>;

  @prop({ ref: () => UserModel })
  userId: Types.ObjectId;
  // userId: Ref<UserModel>;

  @prop({ _id: false, default: {} })
  state: State;

  // @prop({ default: [], ref: () => MovieModel })
  // favorites?: Ref<MovieModel>[];
}

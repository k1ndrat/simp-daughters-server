import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { EpisodeModel } from './episode.model';
import { UserModel } from 'src/user/user.model';

export interface EpisodeStateModel extends Base {}

class State {
  @prop({})
  isLiked: boolean;

  @prop({})
  isWatched: boolean;

  @prop({})
  isForLater: boolean;
}

export class EpisodeStateModel extends TimeStamps {
  @prop({ ref: () => EpisodeModel })
  episodeId: Types.ObjectId;

  @prop({ ref: () => UserModel })
  userId: Types.ObjectId;

  @prop({ _id: false, default: {} })
  state: State;
}

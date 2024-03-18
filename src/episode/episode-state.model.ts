import { Episode } from './episode.model';
import { User } from 'src/user/user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class State {
  @Prop({})
  isLiked: boolean;

  @Prop({})
  isWatched: boolean;

  @Prop({})
  isForLater: boolean;
}

export type EpisodeStateDocument = EpisodeState & Document;

@Schema({ collection: 'EpisodeStates', timestamps: true })
export class EpisodeState {
  @Prop({ ref: () => Episode })
  episodeId: Types.ObjectId;

  @Prop({ ref: () => User })
  userId: Types.ObjectId;

  @Prop({ _id: false, default: {} })
  state: State;
}

export const EpisodeStateSchema = SchemaFactory.createForClass(EpisodeState);

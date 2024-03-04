import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface EpisodeModel extends Base {}

export class EpisodeModel extends TimeStamps {
  @prop({})
  episode: number;

  @prop()
  season: number;

  @prop({})
  title: string;

  @prop({})
  link: string;

  // @prop({ default: [], ref: () => MovieModel })
  // favorites?: Ref<MovieModel>[];
}

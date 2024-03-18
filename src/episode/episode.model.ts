import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EpisodeDocument = Episode & Document;

@Schema({ collection: 'episodes', timestamps: true })
export class Episode {
  @Prop({})
  episode: number;

  @Prop()
  season: number;

  @Prop({})
  title: string;

  @Prop({})
  link: string;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);

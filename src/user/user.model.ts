import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {}

export class UserModel extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop()
  name: string;

  @prop()
  password: string;

  // @prop({ default: [], ref: () => MovieModel })
  // favorites?: Ref<MovieModel>[];
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/facebook/redirect`,
      scope: 'email',
      // scope: 'user_friends',
      profileFields: ['emails', 'name'],
      // profileFields: [
      //   'id',
      //   'displayName',
      //   'link',
      //   'about_me',
      //   'photos',
      //   'email',
      // ],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;
    console.log(profile);

    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    const payload = {
      ...user,
      accessToken,
    };

    done(null, payload);
  }
}

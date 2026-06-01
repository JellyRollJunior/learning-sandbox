import type { UserTokenPayload } from '@/features/auth/types.js';
import passportJwt from 'passport-jwt';
import { env } from '@/config/env.js';
import { mapUserToUserTokenPayload } from '@/features/auth/mapper.js';
import * as userQueries from '@/features/users/queries.js';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options: passportJwt.StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.tokenSecret ?? '',
};
const jwtStrategy = new JwtStrategy(
    options,
    async (tokenPayload: UserTokenPayload, done) => {
        if (!tokenPayload.id) return done(null, false);

        const data = await userQueries.getUserById(tokenPayload.id);
        if (!data) return done(null, false);
        const userTokenPayload = mapUserToUserTokenPayload(data);
        return done(null, userTokenPayload);
    }
);

export { jwtStrategy };

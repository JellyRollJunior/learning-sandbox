import passport from 'passport';
import { localStrategy } from '@/features/auth/passport/localStrategy.js';
import { jwtStrategy } from '@/features/auth/passport/jwtStrategy.js';
import { githubStrategy } from '@/features/auth/passport/githubStrategy.js';

passport.use(localStrategy);
passport.use(jwtStrategy);
passport.use(githubStrategy);

export { passport };

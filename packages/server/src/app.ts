import express from 'express';
import session from 'express-session';
import { env } from '@/config/env.js';
import { passport } from '@/features/auth/passport/passport.js'
import { authRouter } from '@/features/auth/router.js';
import { errorHandler, errorHandler404 } from '@/middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure sessions for oauth
app.use(session({
    secret: env.sessionSecret ?? '',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/auth', authRouter);

// error handlers
app.use(/(.*)/, errorHandler404);
app.use(errorHandler);

export { app };

import { Router } from 'express';
import { signupInputSchema } from '@/features/auth/input.schema.js';
import { validateRequestBody } from '@/middleware/validate.js';
import { passport } from '@/features/auth/passport/passport.js';
import * as authController from '@/features/auth/controller.js';

const authRouter = Router();

authRouter.post(
    '/signup',
    validateRequestBody(signupInputSchema),
    authController.postSignup
);
authRouter.post('/login', authController.postLogin);
authRouter.get('/github', passport.authenticate('github'));
authRouter.get('/github/callback', authController.getLoginGithubCallback);

export { authRouter };

import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { mapUserToDto } from '@/features/users/mapper.js';
import { userDtoSchema } from '@/features/users/dto.schema.js';
import { passport } from '@/features/auth/passport/passport.js';
import { AuthenticationError } from '@/errors/AuthenticationError.js';
import { signToken } from '@/features/auth/passport/signToken.js';
import * as userQueries from '@/features/users/queries.js';

const postSignup = async (
    req: Request<
        {},
        {},
        { username: string; password: string; displayName: string }
    >,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password, displayName } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userQueries.createUser(
            username,
            hashedPassword,
            displayName
        );

        const mappedOutput = mapUserToDto(newUser);
        const validatedOutput = userDtoSchema.parse(mappedOutput);
        res.json(validatedOutput);
    } catch (error) {
        next(error);
    }
};

/* Authenticate credentials & issue jwt on successful authentication */
const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    const authMiddleware = passport.authenticate(
        'local',
        { session: false },
        (
            error: Error | null,
            user: Express.User | false,
            info: { message?: string } | null
        ) => {
            // Executed after LocalStrategy. Parameters sent through LocalStrategy done callback
            if (error) return next(error);
            if (!user) return next(new AuthenticationError(info?.message ?? 'Internal server error'));
            
            // auth successful - sign token
            const token = signToken(user);
            res.json({ message: 'Authentication success', token });
        }
    );
    authMiddleware(req, res, next);
};

const getLoginGithubCallback = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authMiddleware = passport.authenticate(
        'github',
        { failureRedirect: '/' },
        (error: Error, user: Express.User, info: { message?: string }) => {
            // Executed after GithubStrategy
            if (error) return next(error);
            if (!user) return next(new AuthenticationError(info?.message ?? 'Error authenticating with GitHub'));
            
            const token = signToken(user);
            res.json({ message: 'GitHub authentication success', token })
        }
    );
    authMiddleware(req, res, next);
};

export { postSignup, postLogin, getLoginGithubCallback };

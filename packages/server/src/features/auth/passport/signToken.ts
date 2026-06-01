import type { UserTokenPayload } from '@/features/auth/types.js';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env.js';

const signToken = (user: UserTokenPayload) => {
    const options = {
        expiresIn: 60 * 60,
    };
    const token = jwt.sign(user, env.tokenSecret ?? '', options);
    return token;
};

export { signToken };

import type { User } from '@prisma/client';
import type { UserTokenPayload } from '@/features/auth/types.js';

const mapUserToUserTokenPayload = (user: User): UserTokenPayload => {
    return {
        id: user.id,
        displayName: user.displayName,
    };
};

export { mapUserToUserTokenPayload };

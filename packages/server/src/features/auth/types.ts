import type { User } from '@prisma/client';

type UserTokenPayload = Pick<User, 'id' | 'displayName'>;

export type { UserTokenPayload };

import type { UserTokenPayload } from '@/features/auth/types.js';

declare global {
    namespace Express {
        interface User extends UserTokenPayload {}
    }
}

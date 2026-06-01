import type { User } from '@prisma/client';
import type { UserDto } from '@/features/users/dto.schema.js';

const mapUserToDto = (user: User): UserDto => {
    return {
        displayName: user.displayName,
    };
};

export { mapUserToDto };

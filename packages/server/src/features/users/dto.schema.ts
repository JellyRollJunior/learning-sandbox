import { z } from 'zod';
import { displayNameSchema } from '@/features/users/schema.js';

const userDtoSchema = z.object({
    displayName: displayNameSchema,
});
type UserDto = z.infer<typeof userDtoSchema>;

export type { UserDto };
export { userDtoSchema };

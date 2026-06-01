import type { BaseError } from '@/errors/BaseError.js';
import type { ValidationError } from '@/errors/ValidationError.js';

const mapErrorToDto = (error: BaseError) => {
    return {
        status: error.status,
        name: error.name,
        message: error.message,
    };
};

const mapValidationErrorToDto = (error: ValidationError) => {
    return {
        ...mapErrorToDto(error),
        validationErrors: error.validationErrors,
    };
};

export { mapErrorToDto, mapValidationErrorToDto };

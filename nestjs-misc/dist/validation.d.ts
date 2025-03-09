import { ValidationError } from "@nestjs/common";
/**
 * Format validation errors
 * Example: { "name": "must be a string", "contact.email": "Email already exists" }
 */
export declare function formatValidationErrors(validationErrors: ValidationError[]): {};

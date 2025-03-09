import { ValidationPipe } from "@nestjs/common";
/**
 * Used to format the validation errors
 *
 * Add to global pipes
 *
 * app.useGlobalPipes(validationErrorFormatter())
 *
 * @returns
 * Example
 * {
 *  "email": "Email is required",
 *  "password": "Password is required"
 * }
 */
export default function validationErrorFormatter(): ValidationPipe;

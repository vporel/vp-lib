"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
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
function validationErrorFormatter() {
    return new common_1.ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        exceptionFactory: validationErrors => {
            const errors = {};
            function addError(property, constraints) {
                for (const constraint in constraints) {
                    const firstSpaceIndex = constraints[constraint].indexOf(' '); //To remove the property name from the message
                    errors[property] = constraints[constraint].substring(firstSpaceIndex + 1);
                }
            }
            function addErrorGroup(errorGroup) {
                if (errorGroup.children.length == 0)
                    addError(errorGroup.property, errorGroup.constraints);
                else
                    errorGroup.children.forEach(child => addErrorGroup({ ...child, property: errorGroup.property + "." + child.property }));
            }
            validationErrors.forEach(addErrorGroup);
            return new common_1.BadRequestException(errors);
        },
    });
}
exports.default = validationErrorFormatter;

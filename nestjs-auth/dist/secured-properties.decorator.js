"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecuredProperties = exports.SECURED_PROPERTIES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.SECURED_PROPERTIES_KEY = 'secured-properties';
/**
 * Properties protected by password
 */
const SecuredProperties = (...properties) => (0, common_1.SetMetadata)(exports.SECURED_PROPERTIES_KEY, properties);
exports.SecuredProperties = SecuredProperties;

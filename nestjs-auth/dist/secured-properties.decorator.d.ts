export declare const SECURED_PROPERTIES_KEY = "secured-properties";
/**
 * Properties protected by password
 */
export declare const SecuredProperties: (...properties: string[]) => import("@nestjs/common").CustomDecorator<string>;

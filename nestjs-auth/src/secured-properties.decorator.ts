import { SetMetadata } from "@nestjs/common";

export const SECURED_PROPERTIES_KEY = 'secured-properties'

/**
 * Properties protected by password
 */
export const SecuredProperties = (...properties: string[]) => SetMetadata(SECURED_PROPERTIES_KEY, properties)
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IUserFinder } from "./user-finder.interface";
/**
 * Can be used to force the user to provide a password to update some properties
 */
export declare class SecuredPropertiesGuard implements CanActivate {
    private reflector;
    private userFinder;
    constructor(reflector: Reflector, userFinder: IUserFinder);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

import { JwtService } from "@nestjs/jwt";
import { IUserFinder } from "./user-finder.interface";
import { AuthModuleOptions } from "./auth.module";
import { ThirdPartyAuthService } from "@vporel/nestjs-third-party-auth";
export declare class AuthMethodDto {
    methodName: "email" | "google";
    email?: string;
    accessToken?: string;
}
export type AuthResult = {
    accessToken: string;
    expiresIn: number;
    userType: string;
};
/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
export declare class AuthService {
    private readonly authOptions;
    private userFinder;
    private jwtService;
    private thirdPartyAuthService;
    constructor(authOptions: AuthModuleOptions, userFinder: IUserFinder, jwtService: JwtService, thirdPartyAuthService: ThirdPartyAuthService);
    getUserData(emailOrAuthMethod: string | AuthMethodDto): Promise<{
        user: any;
        userClass: string;
    } | null>;
    /**
     * @description Sign in with email only if the user has for example signed in with a third-party service
     * @param email
     * @returns
     */
    signInWithEmailOnly(email: string): Promise<AuthResult>;
    signIn(email: string, password: string): Promise<AuthResult>;
    getAuthToken(user: any, userClass: string): Promise<AuthResult>;
    getEmailFromAuthMethod(authMethod: AuthMethodDto): Promise<string>;
}

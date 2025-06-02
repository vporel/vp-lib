import { AuthMethodDto, AuthResult, AuthService } from "./auth.service";
import { ThirdPartyAuthService } from "@vporel/nestjs-third-party-auth";
declare class SigninDto extends AuthMethodDto {
    password?: string;
}
/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
export declare class AuthController {
    private authService;
    private thirdPartyAuthService;
    constructor(authService: AuthService, thirdPartyAuthService: ThirdPartyAuthService);
    emailExists(authMethod: AuthMethodDto): Promise<{
        userType: string;
    } | false>;
    signIn(data: SigninDto): Promise<AuthResult>;
    extendToken(userClass: any, user: any): Promise<AuthResult>;
    getCurrentUser(userClass: any, user: any): {
        user: any;
        userType: string;
    };
    getEmailFromAuthMethod(authMethod: AuthMethodDto): Promise<string>;
}
export {};

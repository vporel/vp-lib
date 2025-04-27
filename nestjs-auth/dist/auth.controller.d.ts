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
    emailExists(authMethod: AuthMethodDto): Promise<boolean>;
    signIn(data: SigninDto): Promise<AuthResult>;
    extendToken(UserClass: any, user: any): Promise<AuthResult>;
    getCurrentUser(UserClass: any, user: any): {
        user: any;
        userType: string;
    };
    getEmailFromAuthMethod(authMethod: AuthMethodDto): Promise<string>;
}
export {};

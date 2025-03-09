import { JwtService } from "@nestjs/jwt";
import { IUserFinder } from "./user-finder.interface";
import { AuthModuleOptions } from "./auth.module";
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
    constructor(authOptions: AuthModuleOptions, userFinder: IUserFinder, jwtService: JwtService);
    emailExists(email: string): Promise<boolean>;
    /**
     * @description Sign in with email only if the user has for example signed in with a third-party service
     * @param email
     * @returns
     */
    signInWithEmailOnly(email: string): Promise<AuthResult>;
    signIn(email: string, password: string): Promise<AuthResult>;
    getAuthToken(user: any, UserClass: string): Promise<AuthResult>;
}

import { Provider } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ThirdPartyAuthModuleOptions } from '@vporel/nestjs-third-party-auth';
import { AuthGuard } from './auth.guard';
import { SecuredPropertiesGuard } from './secured-properties.guard';
export type AuthModuleOptions = {
    jwtSecretKey: string;
    jwtExpirationTime: string;
    thirdPartyAuthOptions?: ThirdPartyAuthModuleOptions;
    userFinder: Provider;
    emailValidation?: {
        emailTemplatePath: string;
        emailSubject: string;
        byPass?: boolean;
    };
    usersRoles: string[];
};
export declare class AuthModule {
    static forRoot(options: AuthModuleOptions): {
        module: typeof AuthModule;
        imports: import("@nestjs/common").DynamicModule[];
        providers: (typeof AuthGuard | typeof AuthService | typeof SecuredPropertiesGuard | {
            provide: string;
            useValue: AuthModuleOptions;
            useClass?: undefined;
        } | {
            provide: string;
            useClass: any;
            useValue?: undefined;
        })[];
        controllers: any[];
        exports: (string | typeof AuthGuard | typeof SecuredPropertiesGuard)[];
    };
}

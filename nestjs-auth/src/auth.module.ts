import { Global, Module, Provider } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { EmailValidationController } from './emailvalidation.controller';
import { ThirdPartyAuthModule, ThirdPartyAuthModuleOptions } from '@vporel/nestjs-third-party-auth';
import { AuthGuard } from './auth.guard';
import { SecuredPropertiesGuard } from './secured-properties.guard';

export type AuthModuleOptions = {
  jwtSecretKey: string
  jwtExpirationTime: string
  thirdPartyAuthOptions?: ThirdPartyAuthModuleOptions
  userFinder: Provider
  emailValidation?: {
    emailTemplatePath: string
    emailSubject: string,
    byPass?: boolean
  },
  usersRoles: string[]
};

@Global()
@Module({})
export class AuthModule {
  static forRoot(options: AuthModuleOptions) {
    const imports = [
      JwtModule.registerAsync({
        global: true,
        useFactory: async () => ({
          secret: options.jwtSecretKey,         
          signOptions: { expiresIn: options.jwtExpirationTime },         
        })  
      }),
    ]
    if(options.thirdPartyAuthOptions)imports.push(ThirdPartyAuthModule.register(options.thirdPartyAuthOptions))

    const controllers: any[] = [AuthController]
    if(options.emailValidation)controllers.push(EmailValidationController)

    return {
      module: AuthModule,
      imports,
      providers: [
        {provide: 'AUTH_OPTIONS', useValue: options},
        {provide: 'USER_FINDER', useClass: options.userFinder as any},
        AuthService,
        AuthGuard,
        SecuredPropertiesGuard,
      ],
      controllers,
      exports: ['AUTH_OPTIONS', 'USER_FINDER', AuthGuard, SecuredPropertiesGuard]
    };
  }
}

import { Global, Module } from '@nestjs/common';
import { GoogleService } from './third-party.google.service';
import { ThirdPartyAuthService } from './third-party-auth.service';

export type ApisConfig = {
  google?: {
    clientId: string;
    clientSecret: string;
  }
}

export type ThirdPartyAuthModuleOptions = {
  apis: ApisConfig
}

@Global()
@Module({})
export class ThirdPartyAuthModule {
  static register(options: ThirdPartyAuthModuleOptions) {
    return {
      module: ThirdPartyAuthModule,
      providers: [
        {
          provide: "THIRD_PARTY_APIS_CONFIG",
          useValue: options.apis
        },
        ThirdPartyAuthService,
        GoogleService,
      ],
      exports: [GoogleService, ThirdPartyAuthService],
    };
  }
}

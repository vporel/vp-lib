import { Module } from '@nestjs/common';
import { GoogleService } from './third-party.google.service';
import { ThirdPartyAuthService } from './third-party-auth.service';

export const APIS_CONFIG_KEY = "APIS_CONFIG";
export type ApisConfig = {
  google?: {
    clientId: string;
    clientSecret: string;
  }
}

export type ThirdPartyAuthModuleOptions = {
  apis: ApisConfig
}


@Module({})
export class ThirdPartyAuthModule {
  static register(options: ThirdPartyAuthModuleOptions) {
    return {
      module: ThirdPartyAuthModule,
      providers: [
        {
          provide: APIS_CONFIG_KEY,
          useValue: options.apis
        },
        ThirdPartyAuthService,
        GoogleService,
      ],
      exports: [GoogleService, ThirdPartyAuthService],
    };
  }
}

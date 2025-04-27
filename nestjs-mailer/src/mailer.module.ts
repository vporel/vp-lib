import { Global, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';

export const MAILER_OPTIONS = "MAILER_OPTIONS"

export type ApisConfig = {
}

export type MailerOptions = {
  apiService: "gmail" | "mailjet",
  gmail?: {
    email: string,
    pass: string,
  },
  mailjet?: {
    email: string,
    name: string,
    apiKey: string;
    apiSecret: string;
  },
}

@Global()
@Module({})
export class MailerModule {
  static forRoot(options: MailerOptions){
    if(options.apiService == "gmail" && !options.gmail) throw new Error("The configuration is missing for the service 'gmail'")
    if(options.apiService == "mailjet" && !options.mailjet) throw new Error("The configuration is missing for the service 'mailjet'")
    
    return {
      module: MailerModule,
      providers: [
        {
          provide: MAILER_OPTIONS,
          useValue: options
        },
        MailerService
      ],
      exports: [MAILER_OPTIONS, MailerService]
    }
  }
}

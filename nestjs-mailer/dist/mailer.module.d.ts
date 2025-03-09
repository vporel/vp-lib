import { MailerService } from './mailer.service';
export declare const MAILER_OPTIONS = "MAILER_OPTIONS";
export type ApisConfig = {};
export type MailerOptions = {
    apiService: "gmail" | "mailjet";
    gmail?: {
        email: string;
        pass: string;
    };
    mailjet?: {
        email: string;
        name: string;
        apiKey: string;
        apiSecret: string;
    };
};
export declare class MailerModule {
    static forRoot(options: MailerOptions): {
        module: typeof MailerModule;
        providers: (typeof MailerService | {
            provide: string;
            useValue: MailerOptions;
        })[];
        exports: (string | typeof MailerService)[];
    };
}

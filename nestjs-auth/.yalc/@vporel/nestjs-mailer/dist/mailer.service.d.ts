import { MailerOptions } from "./mailer.module";
export declare class MailerService {
    private readonly options;
    constructor(options: MailerOptions);
    sendEmail(receivers: string | string[], subject: string, body: string): Promise<boolean>;
    private mailjet;
    private gmail;
}

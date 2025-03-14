import { MailerService } from "@vporel/nestjs-mailer";
import { AuthModuleOptions } from "./auth.module";
import { IUserFinder } from "./user-finder.interface";
export declare class EmailDto {
    email: string;
}
export declare class EmailAndCodeDto extends EmailDto {
    code: number;
}
/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
export declare class EmailValidationController {
    private mailerService;
    private readonly authOptions;
    private userFinder;
    private SAVED_CODES;
    constructor(mailerService: MailerService, authOptions: AuthModuleOptions, userFinder: IUserFinder);
    sendEmailValidationCode({ email }: EmailDto): Promise<boolean>;
    validateCode({ email, code }: EmailAndCodeDto): Promise<boolean>;
    validateCodeWithUser({ email, code }: EmailAndCodeDto, UserClass: any, user: any): Promise<boolean>;
    private generateRandomCode;
    private saveCode;
    private testCode;
}

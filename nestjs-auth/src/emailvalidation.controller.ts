import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, Post, Res, UseGuards } from "@nestjs/common";
import { IsEmail, IsNumber } from "class-validator";
import { MailerService } from "@vporel/nestjs-mailer";
import { compileTemplate } from "@vporel/handlebars";
import { CurrentUser, CurrentUserClass } from "./auth.decorators";
import { AuthGuard } from "./auth.guard";
import { AuthModuleOptions } from "./auth.module";
import { IUserFinder } from "./user-finder.interface";

export class EmailDto{
    @IsEmail()
    email: string
}

export class EmailAndCodeDto extends EmailDto{
    @IsNumber()
    code: number
}

/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
@Controller("auth")
export class EmailValidationController{
    private SAVED_CODES: {email: string, code: number}[] = []

    constructor(
        private mailerService: MailerService,
        @Inject('AUTH_OPTIONS') private readonly authOptions: AuthModuleOptions,
        @Inject('USER_FINDER') private userFinder: IUserFinder,
    ){}

    @Post('/send-email-validation-code')
    @HttpCode(HttpStatus.OK)
    async sendEmailValidationCode(@Body() {email}: EmailDto){
        if(this.authOptions.emailValidation?.byPass) return true
        const code = this.generateRandomCode()
        this.saveCode(email, code)
        if(await this.mailerService.sendEmail(
            email,
            this.authOptions.emailValidation?.emailSubject, 
            compileTemplate(this.authOptions.emailValidation?.emailTemplatePath, {code})
            
        )) return true
        else throw new HttpException("Mailer error", HttpStatus.INTERNAL_SERVER_ERROR)
    }

    @Post('/validate-email-code')
    @HttpCode(HttpStatus.OK)
    async validateCode(@Body() {email, code}: EmailAndCodeDto){
        if(this.authOptions.emailValidation?.byPass || this.testCode(email, code)){
            return true;
        }else
            throw new HttpException("Wrong code", HttpStatus.UNPROCESSABLE_ENTITY)
    }

    @Post('/validate-email-code-with-user')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async validateCodeWithUser(@Body() {email, code}: EmailAndCodeDto, @CurrentUserClass() userClass, @CurrentUser() user){
        if(this.authOptions.emailValidation?.byPass || this.testCode(email, code)){
            return await this.userFinder.markEmailAsValidated(userClass, user["_id"])
        }else
            throw new HttpException("Wrong code", HttpStatus.UNPROCESSABLE_ENTITY)
    }

    private generateRandomCode(): number{
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private saveCode(email: string, code: number): void{
        this.SAVED_CODES.push({email, code})
    }

    private testCode(email: string, code: number): boolean{
        return !!this.SAVED_CODES.find(el => el.email == email && el.code == code)
    }

}
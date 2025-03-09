import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, InternalServerErrorException, Optional, Post, UseGuards } from "@nestjs/common";
import { AuthResult, AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { CurrentUser, CurrentUserClass } from "./auth.decorators";
import { IsEmail, IsIn, IsNotEmpty, IsString, ValidateIf, ValidateNested } from "class-validator";
import { ThirdPartyAuthService } from "@vp-lib/nestjs-third-party-auth";

class AuthMethodDto{
    @IsString()
    @IsIn(["email", "google"])
    methodName: "email" | "google"

    @IsEmail()
    @ValidateIf(({name}) => name == "email")
    email?: string

    @IsString()
    @ValidateIf(({name}) => name == "google")
    accessToken?: string
}

class SigninDto extends AuthMethodDto{

    @IsString()
    @IsNotEmpty()
    @ValidateIf(({name}) => name == "email")
    password: string
}

/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
@Controller("auth")
export class AuthController{
    constructor(
        private authService: AuthService,
        @Optional()
        private thirdPartyAuthService: ThirdPartyAuthService
    ){}

    @Post('/email-exists')
    @HttpCode(HttpStatus.OK)
    async emailExists(@Body() authMethod: AuthMethodDto): Promise<boolean>{
        const email = await this.getEmailFromAuthMethod(authMethod)
        return this.authService.emailExists(email)
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() data: SigninDto): Promise<AuthResult>{
        if(data.methodName = "email") return this.authService.signIn(data.email, data.password)
        else this.authService.signInWithEmailOnly(await this.getEmailFromAuthMethod(data))
    }
    
    @Post('/token/extend')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async extendToken(@CurrentUserClass() UserClass, @CurrentUser() user): Promise<AuthResult>{
        return this.authService.getAuthToken(UserClass, user) //Reauthenticate
    }

    @Get("/current-user")
    @UseGuards(AuthGuard)
    getCurrentUser(@CurrentUserClass() UserClass, @CurrentUser() user): {user: any, userType: string}{
        return {
            user, 
            userType: UserClass.toLowerCase()
        }
    }

    async getEmailFromAuthMethod(authMethod: AuthMethodDto): Promise<string>{
        if(authMethod.methodName == "email") return authMethod.email as string
        else{
            if(!this.thirdPartyAuthService) throw new InternalServerErrorException("Third-party authentication not enabled")
            return (await this.thirdPartyAuthService.getUserInfos(authMethod.methodName, authMethod.accessToken)).email
        }
    }
}
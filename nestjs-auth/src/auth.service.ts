import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IUserFinder } from "./user-finder.interface";
import { AuthModuleOptions } from "./auth.module";

export type AuthResult = {
    accessToken: string, 
    expiresIn: number,
    userType: string
}


/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
@Injectable()
export class AuthService{
    constructor(
        @Inject('AUTH_OPTIONS') private readonly authOptions: AuthModuleOptions,
        @Inject('USER_FINDER') private userFinder: IUserFinder,
        private jwtService: JwtService
    ){}

    async emailExists(email: string): Promise<boolean>{
        return !!(await this.userFinder.findByEmail(email))
    }

    /**
     * @description Sign in with email only if the user has for example signed in with a third-party service
     * @param email 
     * @returns 
     */
    async signInWithEmailOnly(email: string): Promise<AuthResult>{
        if(!email) throw new BadRequestException("The email is missing")
        const result = await this.userFinder.findByEmail(email)
        if(!result || !result.user) throw new NotFoundException("No user found with this email")
        const {user, UserClass} = result
        return await this.getAuthToken(user, UserClass)
    }

    async signIn(email: string, password: string): Promise<AuthResult>{
        if(!email) throw new BadRequestException("The userName or the email is missing")
        if(!password) throw new BadRequestException("The password is missing")
        const result = await this.userFinder.findByEmail(email)
        if(!result || !result.user) throw new NotFoundException("No user found with this email")
        const {user, UserClass} = result
        if(!(await this.userFinder.comparePasswords(password, user.password))) throw new UnauthorizedException("The password is incorrect")
        return await this.getAuthToken(user, UserClass)
    }

    async getAuthToken(user: any, UserClass: string): Promise<AuthResult>{
        const payload = {sub: user["_id"], userName: user.userName, UserClass}
        return {
            accessToken: await this.jwtService.signAsync(payload, {secret: this.authOptions.jwtSecretKey}),
            expiresIn: parseInt(this.authOptions.jwtExpirationTime),    //In seconds,
            userType: UserClass.toLowerCase()
        }
    }
}
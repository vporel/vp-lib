import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SKIP_AUTH_KEY } from "./auth.decorators";
import { Reflector } from "@nestjs/core";
import { AuthModuleOptions } from "./auth.module";
import { IUserFinder } from "./user-finder.interface";
import { ROLES_KEY } from "./roles.decorator";
import { IUserRoles } from "./user-roles.interface";


/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService, 
        @Inject('USER_FINDER') private userFinder: IUserFinder,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const skipAuth = this.reflector.getAllAndOverride<Boolean>(SKIP_AUTH_KEY, [context.getHandler(), context.getClass()]);
        if(skipAuth) return true
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        if(!token) throw new UnauthorizedException()
        try{
            const payload = await this.jwtService.verifyAsync(token)
            const id = payload.sub
            request.UserClass = payload.UserClass
            request.user = await this.userFinder.findById(payload.UserClass, id)
        }catch{
            throw new UnauthorizedException()
        }

        //Roles
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        
        return this.verifyRoles(requiredRoles, request)
    }

    private verifyRoles(requiredRoles: string[], request){
        if (!requiredRoles || requiredRoles.length == 0) return true;
        const { user } = request
        const userRoles = (user as IUserRoles).getRoles()
        return requiredRoles.some((role) => userRoles.includes(role))
    }

    private extractTokenFromHeader(request): string|undefined{
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === "Bearer" ? token : undefined
    }
}
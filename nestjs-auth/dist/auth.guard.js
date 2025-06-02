"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_decorators_1 = require("./auth.decorators");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("./roles.decorator");
/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
let AuthGuard = class AuthGuard {
    reflector;
    jwtService;
    userFinder;
    constructor(reflector, jwtService, userFinder) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.userFinder = userFinder;
    }
    async canActivate(context) {
        const skipAuth = this.reflector.getAllAndOverride(auth_decorators_1.SKIP_AUTH_KEY, [context.getHandler(), context.getClass()]);
        if (skipAuth)
            return true;
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token)
            throw new common_1.UnauthorizedException();
        try {
            const payload = await this.jwtService.verifyAsync(token);
            const id = payload.sub;
            request.userClass = payload.userClass;
            request.user = await this.userFinder.findById(payload.userClass, id);
        }
        catch {
            throw new common_1.UnauthorizedException();
        }
        //Roles
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        return this.verifyRoles(requiredRoles, request);
    }
    verifyRoles(requiredRoles, request) {
        if (!requiredRoles || requiredRoles.length == 0)
            return true;
        const { user } = request;
        const userRoles = user.getRoles();
        return requiredRoles.some((role) => userRoles.includes(role));
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === "Bearer" ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('USER_FINDER')),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService, Object])
], AuthGuard);

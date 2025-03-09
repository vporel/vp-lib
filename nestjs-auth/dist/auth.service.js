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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
let AuthService = exports.AuthService = class AuthService {
    authOptions;
    userFinder;
    jwtService;
    constructor(authOptions, userFinder, jwtService) {
        this.authOptions = authOptions;
        this.userFinder = userFinder;
        this.jwtService = jwtService;
    }
    async emailExists(email) {
        return !!(await this.userFinder.findByEmail(email));
    }
    /**
     * @description Sign in with email only if the user has for example signed in with a third-party service
     * @param email
     * @returns
     */
    async signInWithEmailOnly(email) {
        if (!email)
            throw new common_1.BadRequestException("The email is missing");
        const result = await this.userFinder.findByEmail(email);
        if (!result || !result.user)
            throw new common_1.NotFoundException("No user found with this email");
        const { user, UserClass } = result;
        return await this.getAuthToken(user, UserClass);
    }
    async signIn(email, password) {
        if (!email)
            throw new common_1.BadRequestException("The userName or the email is missing");
        if (!password)
            throw new common_1.BadRequestException("The password is missing");
        const result = await this.userFinder.findByEmail(email);
        if (!result || !result.user)
            throw new common_1.NotFoundException("No user found with this email");
        const { user, UserClass } = result;
        if (!(await this.userFinder.comparePasswords(password, user.password)))
            throw new common_1.UnauthorizedException("The password is incorrect");
        return await this.getAuthToken(user, UserClass);
    }
    async getAuthToken(user, UserClass) {
        const payload = { sub: user["_id"], userName: user.userName, UserClass };
        return {
            accessToken: await this.jwtService.signAsync(payload, { secret: this.authOptions.jwtSecretKey }),
            expiresIn: parseInt(this.authOptions.jwtExpirationTime),
            userType: UserClass.toLowerCase()
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AUTH_OPTIONS')),
    __param(1, (0, common_1.Inject)('USER_FINDER')),
    __metadata("design:paramtypes", [Object, Object, jwt_1.JwtService])
], AuthService);

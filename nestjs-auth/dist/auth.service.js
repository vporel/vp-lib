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
exports.AuthService = exports.AuthMethodDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const class_validator_1 = require("class-validator");
const nestjs_third_party_auth_1 = require("@vporel/nestjs-third-party-auth");
class AuthMethodDto {
    //only the email method can be used if the third-party-auth module is not enabled
    methodName;
    email;
    accessToken;
}
exports.AuthMethodDto = AuthMethodDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["email", "google"]),
    __metadata("design:type", String)
], AuthMethodDto.prototype, "methodName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateIf)(({ methodName }) => methodName == "email"),
    __metadata("design:type", String)
], AuthMethodDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)(({ methodName }) => methodName == "google"),
    __metadata("design:type", String)
], AuthMethodDto.prototype, "accessToken", void 0);
/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
let AuthService = class AuthService {
    authOptions;
    userFinder;
    jwtService;
    thirdPartyAuthService;
    constructor(authOptions, userFinder, jwtService, thirdPartyAuthService) {
        this.authOptions = authOptions;
        this.userFinder = userFinder;
        this.jwtService = jwtService;
        this.thirdPartyAuthService = thirdPartyAuthService;
    }
    async getUserData(emailOrAuthMethod) {
        let email = "";
        if (typeof emailOrAuthMethod == "string")
            email = emailOrAuthMethod;
        else
            email = await this.getEmailFromAuthMethod(emailOrAuthMethod);
        return await this.userFinder.findByEmail(email);
    }
    /**
     * @description Sign in with email only if the user has for example signed in with a third-party service
     * @param email
     * @returns
     */
    async signInWithEmailOnly(email) {
        if (!email)
            throw new common_1.BadRequestException("email_required: The email is missing");
        const result = await this.userFinder.findByEmail(email);
        if (!result || !result.user)
            throw new common_1.NotFoundException("user_not_found: No user found with this email");
        const { user, userClass } = result;
        return await this.getAuthToken(user, userClass);
    }
    async signIn(email, password) {
        if (!email)
            throw new common_1.BadRequestException("email_required: The the email is missing");
        if (!password)
            throw new common_1.BadRequestException("password_required: The password is missing");
        const result = await this.userFinder.findByEmail(email);
        if (!result || !result.user)
            throw new common_1.NotFoundException("user_not_found: No user found with this email");
        const { user, userClass } = result;
        if (!(await this.userFinder.comparePasswords(password, user.password)))
            throw new common_1.UnauthorizedException("incorrect_password: The password is incorrect");
        return await this.getAuthToken(user, userClass);
    }
    async getAuthToken(user, userClass) {
        const payload = { sub: user["_id"], userName: user.userName, userClass };
        return {
            accessToken: await this.jwtService.signAsync(payload, { secret: this.authOptions.jwtSecretKey }),
            expiresIn: parseInt(this.authOptions.jwtExpirationTime), //In seconds,
            userType: userClass.toLowerCase()
        };
    }
    async getEmailFromAuthMethod(authMethod) {
        if (authMethod.methodName == "email")
            return authMethod.email;
        else {
            if (!this.thirdPartyAuthService)
                throw new common_1.InternalServerErrorException("Third-party authentication not enabled");
            return (await this.thirdPartyAuthService.getUserInfos(authMethod.methodName, authMethod.accessToken)).email;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AUTH_OPTIONS')),
    __param(1, (0, common_1.Inject)('USER_FINDER')),
    __param(3, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, Object, jwt_1.JwtService,
        nestjs_third_party_auth_1.ThirdPartyAuthService])
], AuthService);

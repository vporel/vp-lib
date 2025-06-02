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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_guard_1 = require("./auth.guard");
const auth_decorators_1 = require("./auth.decorators");
const class_validator_1 = require("class-validator");
const nestjs_third_party_auth_1 = require("@vporel/nestjs-third-party-auth");
class SigninDto extends auth_service_1.AuthMethodDto {
    password;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateIf)(({ methodName }) => methodName == "email"),
    __metadata("design:type", String)
], SigninDto.prototype, "password", void 0);
/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
let AuthController = class AuthController {
    authService;
    thirdPartyAuthService;
    constructor(authService, thirdPartyAuthService) {
        this.authService = authService;
        this.thirdPartyAuthService = thirdPartyAuthService;
    }
    async emailExists(authMethod) {
        const email = await this.getEmailFromAuthMethod(authMethod);
        const userData = await this.authService.getUserData(email);
        return userData ? { userType: userData.userClass.toLowerCase() } : false;
    }
    async signIn(data) {
        if (data.methodName == "email")
            return this.authService.signIn(data.email, data.password);
        else
            return await this.authService.signInWithEmailOnly(await this.getEmailFromAuthMethod(data));
    }
    async extendToken(userClass, user) {
        return await this.authService.getAuthToken(userClass, user); //Reauthenticate
    }
    getCurrentUser(userClass, user) {
        return {
            user,
            userType: userClass
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
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/email-exists'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_service_1.AuthMethodDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "emailExists", null);
__decorate([
    (0, common_1.Post)('/signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SigninDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('/token/extend'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorators_1.CurrentUserClass)()),
    __param(1, (0, auth_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "extendToken", null);
__decorate([
    (0, common_1.Get)("/current-user"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, auth_decorators_1.CurrentUserClass)()),
    __param(1, (0, auth_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "getCurrentUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __param(1, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        nestjs_third_party_auth_1.ThirdPartyAuthService])
], AuthController);

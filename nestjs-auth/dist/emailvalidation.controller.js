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
exports.EmailValidationController = exports.EmailAndCodeDto = exports.EmailDto = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const nestjs_mailer_1 = require("@vporel/nestjs-mailer");
const handlebars_1 = require("@vporel/handlebars");
const auth_decorators_1 = require("./auth.decorators");
const auth_guard_1 = require("./auth.guard");
class EmailDto {
    email;
}
exports.EmailDto = EmailDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], EmailDto.prototype, "email", void 0);
class EmailAndCodeDto extends EmailDto {
    code;
}
exports.EmailAndCodeDto = EmailAndCodeDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], EmailAndCodeDto.prototype, "code", void 0);
/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
let EmailValidationController = exports.EmailValidationController = class EmailValidationController {
    mailerService;
    authOptions;
    userFinder;
    SAVED_CODES = [];
    constructor(mailerService, authOptions, userFinder) {
        this.mailerService = mailerService;
        this.authOptions = authOptions;
        this.userFinder = userFinder;
    }
    async sendEmailValidationCode({ email }) {
        if (this.authOptions.emailValidation?.byPass)
            return true;
        const code = this.generateRandomCode();
        this.saveCode(email, code);
        if (await this.mailerService.sendEmail(email, this.authOptions.emailValidation?.emailSubject, (0, handlebars_1.compileTemplate)(this.authOptions.emailValidation?.emailTemplatePath, { code })))
            return true;
        else
            throw new common_1.HttpException("Mailer error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async validateCode({ email, code }) {
        if (this.authOptions.emailValidation?.byPass || this.testCode(email, code)) {
            return true;
        }
        else
            throw new common_1.HttpException("Wrong code", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
    async validateCodeWithUser({ email, code }, UserClass, user) {
        if (this.authOptions.emailValidation?.byPass || this.testCode(email, code)) {
            return await this.userFinder.markEmailAsValidated(UserClass, user["_id"]);
        }
        else
            throw new common_1.HttpException("Wrong code", common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
    generateRandomCode() {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    saveCode(email, code) {
        this.SAVED_CODES.push({ email, code });
    }
    testCode(email, code) {
        return !!this.SAVED_CODES.find(el => el.email == email && el.code == code);
    }
};
__decorate([
    (0, common_1.Post)('/send-email-validation-code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmailDto]),
    __metadata("design:returntype", Promise)
], EmailValidationController.prototype, "sendEmailValidationCode", null);
__decorate([
    (0, common_1.Post)('/validate-email-code'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmailAndCodeDto]),
    __metadata("design:returntype", Promise)
], EmailValidationController.prototype, "validateCode", null);
__decorate([
    (0, common_1.Post)('/validate-email-code-with-user'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_decorators_1.CurrentUserClass)()),
    __param(2, (0, auth_decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmailAndCodeDto, Object, Object]),
    __metadata("design:returntype", Promise)
], EmailValidationController.prototype, "validateCodeWithUser", null);
exports.EmailValidationController = EmailValidationController = __decorate([
    (0, common_1.Controller)("auth"),
    __param(1, (0, common_1.Inject)('AUTH_OPTIONS')),
    __param(2, (0, common_1.Inject)('USER_FINDER')),
    __metadata("design:paramtypes", [nestjs_mailer_1.MailerService, Object, Object])
], EmailValidationController);

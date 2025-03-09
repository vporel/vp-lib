"use strict";
/**
 * @description Units tests for third-party-auth service
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const third_party_auth_service_1 = require("./third-party-auth.service");
const third_party_auth_module_1 = require("./third-party-auth.module");
const third_party_google_service_1 = require("./third-party.google.service");
describe("third-party-auth.service", () => {
    let thirdPartyAuthService;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                {
                    provide: third_party_auth_module_1.APIS_CONFIG_KEY,
                    useValue: {}
                },
                third_party_auth_service_1.ThirdPartyAuthService,
                third_party_google_service_1.GoogleService,
            ]
        }).compile();
        thirdPartyAuthService = module.get(third_party_auth_service_1.ThirdPartyAuthService);
    });
    describe("getServiceByName", () => {
        it("should throw an error if the service is not configured", () => {
            expect(() => thirdPartyAuthService.getServiceByName("google")).toThrow();
        });
    });
});

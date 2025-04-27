/**
 * @description Units tests for third-party-auth service
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */

import { Test } from "@nestjs/testing";
import { ThirdPartyAuthService } from "./third-party-auth.service";
import { GoogleService } from "./third-party.google.service";

describe("third-party-auth.service", () => {
    let thirdPartyAuthService: ThirdPartyAuthService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: "THIRD_PARTY_APIS_CONFIG",
                    useValue: {}
                },
                ThirdPartyAuthService,
                GoogleService,
            ]
        }).compile();

        thirdPartyAuthService = module.get(ThirdPartyAuthService);
    });

    describe("getServiceByName", () => {
        it("should throw an error if the service is not configured", () => {
            expect(() => thirdPartyAuthService.getServiceByName("google")).toThrow();
        });
    });
});
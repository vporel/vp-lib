import { ApisConfig } from "./third-party-auth.module";
import { ThirdPartyService } from "./third-party.service.abs";
import { GoogleService } from "./third-party.google.service";
type ThirdPartyServiceName = "google";
/**
 * @description Service for third-party authentication
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
export declare class ThirdPartyAuthService {
    readonly apis: ApisConfig;
    services: Record<string, ThirdPartyService>;
    constructor(apis: ApisConfig, googleService: GoogleService);
    isTokenValid(service: ThirdPartyServiceName, token: string): Promise<boolean>;
    /**
     * @throws HttpException If the token is invalid
     */
    getUserInfos(service: ThirdPartyServiceName, token: string): Promise<null | ({
        email: string;
        [key: string]: any;
    })>;
    getServiceByName(name: ThirdPartyServiceName): ThirdPartyService;
}
export {};

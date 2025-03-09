import { ThirdPartyService } from "./third-party.service.abs";
import { ApisConfig } from "./third-party-auth.module";
type GooglePayload = {
    /** The user's unique Google ID */
    id: string;
    email: string;
    family_name: string;
    given_name: string;
    picture: string;
};
/**
 * @description Service using Google API to authenticate users
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
export declare class GoogleService extends ThirdPartyService<GooglePayload> {
    readonly apis: ApisConfig;
    constructor(apis: ApisConfig);
    isTokenValid(token: string): Promise<boolean>;
    getUserInfos(token: string): Promise<any>;
}
export {};

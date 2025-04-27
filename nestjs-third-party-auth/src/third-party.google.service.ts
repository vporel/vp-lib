import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ThirdPartyService } from "./third-party.service.abs";
import { ApisConfig } from "./third-party-auth.module";

type GooglePayload = {
    /** The user's unique Google ID */
    id: string, 
    email: string,
    family_name: string,
    given_name: string,
    picture: string,
}

/**
 * @description Service using Google API to authenticate users
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
@Injectable()
export class GoogleService extends ThirdPartyService<GooglePayload> {

    constructor(@Inject(forwardRef(() =>  "THIRD_PARTY_APIS_CONFIG")) readonly apis: ApisConfig){
        super()

    }

    async isTokenValid(token: string){
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
              Authorization: `Bearer ${token}`	
            }
        })
        console.log(await response.json())
        return response.status == 200
    }

    async getUserInfos(token: string){
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
              Authorization: `Bearer ${token}`	
            }
        })
        return await response.json()
    }
}
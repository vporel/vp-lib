import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ApisConfig } from "./third-party-auth.module";
import { ThirdPartyService } from "./third-party.service.abs";
import { GoogleService } from "./third-party.google.service";

type ThirdPartyServiceName = "google"

/**
 * @description Service for third-party authentication
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
@Injectable()
export class ThirdPartyAuthService{
    services: Record<string, ThirdPartyService>

    constructor(
        @Inject("THIRD_PARTY_APIS_CONFIG") readonly apis: ApisConfig,
        googleService: GoogleService,
    ){
        this.services = {}
        if(apis.google) this.services["google"] = googleService
    }

    async isTokenValid(service: ThirdPartyServiceName, token: string): Promise<boolean>{
        return this.getServiceByName(service).isTokenValid(token)
    }

    /**
     * @throws HttpException If the token is invalid
     */
    async getUserInfos(service: ThirdPartyServiceName, token: string): Promise<null|({email: string, [key: string]: any})>{
        const infos = this.getServiceByName(service).getUserInfos(token)
        if(!infos) throw new HttpException(`Invalid ${service} access token`, HttpStatus.UNAUTHORIZED)
        return infos
    }

    getServiceByName(name: ThirdPartyServiceName): ThirdPartyService{
        if(!this.services[name]) throw new Error(`No service configured with the name ${name}`)
        return this.services[name]
    }
}

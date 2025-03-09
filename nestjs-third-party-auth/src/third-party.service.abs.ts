/**
 * @description Abstract class for third-party services
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 */
export abstract class ThirdPartyService<PayloadDefinition extends {email: string} = any> {
    abstract isTokenValid(token: string): Promise<boolean>;
    abstract getUserInfos(token: string): Promise<null|PayloadDefinition|{email: string}>;
}


import {BaseSdo, LoginSdo} from '../../repositories'
import {BaseDto, User, Goods} from '../../services'
import {injectable} from "inversify";
import {ApiResult} from "business_core_app_react/lib/webapi/apiresult";
import {API_STATUS_CODE} from "business_core_app_react";

@injectable()
export class BaseService {
    constructor() {
    }

    protected transform = (sdo: BaseSdo): BaseDto => {
        let dto: BaseDto = {
            isSuccess: sdo.isSuccess,
            message: sdo.message
        };

        return dto;
    }

    protected transformLogin = (sdo: LoginSdo): BaseDto => {
        let dto: BaseDto = this.transformByJSON<BaseDto, LoginSdo>(sdo);
        return dto;
    }

    protected mappingUser = (data: any): User => {
        let user: User = this.mappingByJSON(data);
        return user;
    }

    protected mappingGoods = (data: any): Goods => {
        let goods: Goods = this.mappingByJSON(data);
        return goods;
    }

    private mappingByJSON = <T>(data: any): T => {
        let dto: T = <T>JSON.parse(JSON.stringify(data));
        return dto;
    }


    private transformByJSON = <T, U>(sdo: U): T => {
        let dto: T = <T>JSON.parse(JSON.stringify(sdo));
        return dto;
    }
}
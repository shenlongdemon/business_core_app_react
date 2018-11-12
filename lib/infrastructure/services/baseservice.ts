import {LoginSdo} from '../../repositories'
import {BaseDto, User} from '../../services'
import {injectable} from "inversify";

@injectable()
export class BaseService {
    constructor() {
    }

    protected transformLogin = (sdo: LoginSdo): BaseDto => {
        let dto: BaseDto = this.transformByJSON<BaseDto, LoginSdo>(sdo);
        return dto;
    }

    protected mappingUser = (data: any): User | null => {
        let user: User | null = this.mappingByJSON(data);
        return user;
    }


    private mappingByJSON = <T>(data: any): T | null => {
        try {
            let dto: T = <T>JSON.parse(JSON.stringify(data));
            return dto;
        }
        catch (e) {
            return null;
        }
    }


    private transformByJSON = <T, U>(sdo: U): T | null => {
        try {
            let dto: T = <T>JSON.parse(JSON.stringify(sdo));
            return dto;
        }
        catch (e) {
            return null;
        }
    }
}
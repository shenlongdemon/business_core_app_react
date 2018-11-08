import {UserSdo, LoginSdo} from '../../services';
export class BaseService {
    constructor() {}

    /**
     * transferm to UserSdo
     * @param data
     */
    protected transform = <UserSdo>(data: any): UserSdo|null => {
        try {
            let userSdo: UserSdo = Object.freeze(data);

            return userSdo;
        }
        catch (e) {
            return null;
        }
    }
}
import {IAuthService, UserSdo, LoginSdo} from '../../services';
import {IStore} from '../../repositories';
import {IAuthRepo} from '../../repositories';
import {injectable, inject} from 'inversify';
import {PUBLIC_TYPES, PRIVATE_TYPES} from '../identifiers';
import {CONSTANTS, API_STATUS_CODE} from '../../common';
import {ApiResult} from '../../webapi';
import {BaseService} from './baseservice';

@injectable()
export class AuthService extends BaseService implements IAuthService {

    @inject(PRIVATE_TYPES.IAuthRepo) private authRepo!: IAuthRepo;
    @inject(PUBLIC_TYPES.IStore) private store!: IStore;


    login = async (username: string, password: string): Promise<LoginSdo> => {
        let res: ApiResult = await this.authRepo.login(username, password);

        let loginSdo: LoginSdo = {
            isSuccess: res.Status === API_STATUS_CODE.OK,
            user: this.transform(res.Data),
            message: res.Message,
            __debug: res
        };

        // save UserSdo to local storage
        if (loginSdo.user) {
            this.store.saveUser(loginSdo.user);
        }

        return loginSdo
    }
}

import {IStore} from '../../repositories';
import {IAuthRepo, LoginRequest, LoginSdo, UserSdo} from '../../repositories';
import {IWebApi, ApiResult} from '../../webapi';
import {injectable, inject} from 'inversify';
import {STORAGE_KEYS, CONSTANTS, API} from '../../common';
import 'reflect-metadata';
import {PUBLIC_TYPES, PRIVATE_TYPES} from '../identifiers';
import {BaseRepository} from './baserepository';


@injectable()
export class AuthRepo extends BaseRepository implements IAuthRepo {
    @inject(PUBLIC_TYPES.IWebApi) private api!: IWebApi;
    @inject(PUBLIC_TYPES.IStore) private store!: IStore;


    login = async (username: string, password: string): Promise<LoginSdo> => {
        let data: LoginRequest = {
            phone: username,
            password: password
        };
        let res = await this.api.post(API.LOGIN, data);
        let loginSdo: LoginSdo = {
            ...this.transform(res),
            user: res.Data
        };

        return loginSdo;
    }
}
import {IStore} from '../../repositories';
import {IAuthRepo, LoginRequest} from '../../repositories';
import {IWebApi, ApiResult} from '../../webapi';
import {injectable, inject} from 'inversify';
import {STORAGE_KEYS, CONSTANTS, API} from '../../common';
import 'reflect-metadata';
import {PUBLIC_TYPES, PRIVATE_TYPES} from '../identifiers';

@injectable()
export class AuthRepo implements IAuthRepo {
    @inject(PUBLIC_TYPES.IWebApi) private api!: IWebApi;
    @inject(PUBLIC_TYPES.IStore) private store!: IStore;


    login = async (username: string, password: string, terminalToken: string): Promise<ApiResult> => {
        let data: LoginRequest = {
            username: username,
            password: password
        };
        let res = await this.api.post(API.LOGIN, data);

        return res;
    }
}
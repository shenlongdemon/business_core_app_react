import {IStore} from '../../repositories/istore';
import {IAuthRepo} from '../../repositories/iauthrepo';
import {IWebApi} from '../../webapi/iwebapi';
import { injectable, inject } from 'inversify';
import { STORAGE_KEYS, CONSTANTS } from '../../common';
import 'reflect-metadata';
import { PUBLIC_TYPES, PRIVATE_TYPES } from '../identifiers';

@injectable()
export class AuthRepo implements IAuthRepo {
    @inject(PUBLIC_TYPES.IWebApi) private api!: IWebApi;
    @inject(PUBLIC_TYPES.IStore) private store!: IStore;

    
    loginMaster = async (namespace: string, password: string): Promise<string> => {
        let res = await this.api.get('');
        return '';
    }

    getMasterToken = async (): Promise<string> => {
        let masterToken = await this.store.getMasterToken(CONSTANTS.STR_EMPTY);
        return masterToken;
    }
}
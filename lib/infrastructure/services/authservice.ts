import {IAuthService} from '../../services/iauthservice';
import {IStore} from '../../repositories/istore';
import {IAuthRepo} from '../../repositories/iauthrepo';
import { injectable, inject } from 'inversify';
import { PUBLIC_TYPES, PRIVATE_TYPES } from '../identifiers';
import { CONSTANTS } from '../../common';

@injectable()
export class AuthService implements IAuthService {
    
    @inject(PRIVATE_TYPES.IAuthRepo) private authRepo!: IAuthRepo;
    @inject(PUBLIC_TYPES.IStore) private store!: IStore;


    loginMaster = async (namespace: string, password: string): Promise<string> => {
        let masterToken = await this.authRepo.loginMaster(namespace, password);
        this.store.saveMasterToken(masterToken);
        return masterToken;
    }

    isMasterLogged = async (): Promise<boolean> => {
        let masterToken = await this.store.getMasterToken(CONSTANTS.STR_EMPTY);
        return masterToken !== CONSTANTS.STR_EMPTY
    }
}

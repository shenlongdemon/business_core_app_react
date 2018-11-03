import {IAuthService} from '../../services/iauthservice';
import {IStore} from '../../repositories/istore';
import {IAuthRepo} from '../../repositories/iauthrepo';
import { injectable, inject } from 'inversify';
import { TYPES } from '../identifiers';
import { STORAGE_KEYS, CONSTANTS } from '../../common';

@injectable()
export class AuthService implements IAuthService {
    
    @inject(TYPES.IAuthRepo) private authRepo!: IAuthRepo;
    
    loginMaster = async (namespace: string, password: string): Promise<string> => {
        let masterToken = await this.authRepo.loginMaster(namespace, password);
        
        return masterToken;
    }

    isMasterLogged = async (): Promise<boolean> => {
        // let masterToken = await this.store.getItem(STORAGE_KEYS.Master_Token, CONSTANTS.STR_EMPTY);
        // return masterToken !== CONSTANTS.STR_EMPTY
        return true;
    }
}

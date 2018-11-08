/// <reference path="../infrastructure/services/authservice.ts" />

import {LoginSdo, UserSdo} from './sdo';


export interface  IAuthService {
    /**
     * Submitting master login
     * @param namespance name of company
     * @param password password
     */
    login(username: string, password: string): Promise<LoginSdo>;

}
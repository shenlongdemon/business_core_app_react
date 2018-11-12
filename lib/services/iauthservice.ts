/// <reference path="../infrastructure/services/authservice.ts" />

import {LoginSdo, BaseSdo} from '../repositories/sdo';


export interface  IAuthService {
    /**
     * Submitting master login
     * @param namespance name of company
     * @param password password
     */
    login(username: string, password: string): Promise<BaseSdo>;


    /**
     * check user logged in or not
     */
    isLoggedIn(): Promise<boolean>;

}
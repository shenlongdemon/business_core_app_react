///<reference path="../infrastructure/repositpries/authrepo.ts"/>
import {LoginSdo} from './sdo'

export interface IAuthRepo {
    login(user: string, password: string): Promise<LoginSdo>;
}
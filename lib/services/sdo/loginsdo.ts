import {BaseSdo} from './basesdo'
import {UserSdo} from './usersdo'

export interface LoginSdo extends BaseSdo{
    user?: UserSdo|null;
    isSuccess: boolean;
}
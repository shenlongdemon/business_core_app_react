/**
 * Because it is local storage so i need to be implemented on RN or ReactJS
        - RN        uses AsyncStorage follow https://facebook.github.io/react-native/docs/asyncstorage
        - ReactJS   uses LocalStorage
    
    Scope: singleton
 */
import {UserSdo} from '../services';

export interface IStore {
    /**
     * save user to store and use it as product owner
     * @param user
     */
    saveUser(user: UserSdo): Promise<void>;
}
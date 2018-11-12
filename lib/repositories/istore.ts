/**
 * Because it is local storage so i need to be implemented on RN or ReactJS
 - RN        uses AsyncStorage follow https://facebook.github.io/react-native/docs/asyncstorage
 - ReactJS   uses LocalStorage

 Scope: singleton
 */
import {User} from '../services';

export interface IStore {

    /**
     * get user who logged in
     */
    getUser(): Promise<User|null>;

    /**
     * save user to store and use it as product owner
     * @param user
     */
    saveUser(user: User): Promise<void>;
}
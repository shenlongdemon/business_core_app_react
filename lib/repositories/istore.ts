/**
 * Because it is local storage so i need to be implemented on RN or ReactJS
 - RN        uses AsyncStorage follow https://facebook.github.io/react-native/docs/asyncstorage
 - ReactJS   uses LocalStorage
 
 Scope: singleton
 */
import {User, UserInfo, Position} from '../services';

export interface IStore {
  
  /**
   * get current position what is saved when user moves and system will keep tract user's position
   */
  getCurrentPosition(): Promise<Position>
  
  /**
   * get userinfo to generate code for item
   */
  getUserInfo(): Promise<UserInfo>;
  
  /**
   * get user who logged in
   */
  getUser(): Promise<User | null>;
  
  /**
   * save user to store and use it as product owner
   * @param user
   */
  saveUser(user: User): Promise<void>;
}
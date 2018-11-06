/**
 * Because it is local storage so i need to be implemented on RN or ReactJS
        - RN        uses AsyncStorage follow https://facebook.github.io/react-native/docs/asyncstorage
        - ReactJS   uses LocalStorage
    
    Scope: singleton
 */
export interface IStore {
    saveMasterToken(key: string): Promise<void>;
    getMasterToken(defaultValue: string): Promise<string>;
}
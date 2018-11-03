/*
    Because it is local storage so i need to be implemented on RN or ReactJS
        - RN        uses AsyncStorage follow https://facebook.github.io/react-native/docs/asyncstorage
        - ReactJS   uses LocalStorage
    
    Scope: singleton
*/

export interface IStore {
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string, defaultValue: string): Promise<string>;
}
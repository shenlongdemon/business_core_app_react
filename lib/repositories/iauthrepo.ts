export interface IAuthRepo {
    loginMaster(namespace: string, password: string): Promise<string>; 
    getMasterToken(): Promise<string>;
}
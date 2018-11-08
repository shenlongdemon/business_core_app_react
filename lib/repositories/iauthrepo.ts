///<reference path="../infrastructure/repositpries/authrepo.ts"/>


export interface IAuthRepo {
    login(user: string, password: string): Promise<ApiRes>;
}
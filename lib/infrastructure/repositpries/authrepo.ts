import { IAuthRepo, LoginRequest, LoginSdo } from "../../repositories";
import { IWebApi, ApiResult } from "../../webapi";
import { injectable, inject } from "inversify";
import {  API } from "../../common";
import "reflect-metadata";
import { PUBLIC_TYPES } from "../identifiers";
import { BaseRepository } from "./baserepository";

@injectable()
export class AuthRepo extends BaseRepository implements IAuthRepo {
  @inject(PUBLIC_TYPES.IWebApi) private api!: IWebApi;

  login = async (username: string, password: string): Promise<LoginSdo> => {
    const data: LoginRequest = {
      phone: username,
      password: password
    };
    const res: ApiResult = await this.api.post(API.LOGIN(), data);
    return {
      ...this.transform(res),
      user: res.data
    };
  };
}

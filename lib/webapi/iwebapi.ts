import {ApiResult} from "./apiresult";

export interface IWebApi {

    get(url: string): Promise<ApiResult>;
    post(url: string, data: any): Promise<ApiResult>;
    put(url: string, data: any): Promise<ApiResult>;
    delete(url: string): Promise<ApiResult>;
    
}
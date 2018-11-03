/*
    Using typed-rest-client at https://github.com/Microsoft/typed-rest-client
*/

import {IWebApi} from "../../webapi/iwebapi";
import {ApiResult} from "../../webapi/apiresult";
import { injectable } from "inversify";

@injectable()
export class TRCWebApi implements IWebApi{
    private static readonly USER_AGENT: string = 'phoenix-api';
    constructor() {}

    get = async (url: string): Promise<ApiResult> => {
        
        return {
            data: null,
            message: '',
            errorCode: 0
        };
    }

    post = async (url: string, data: any): Promise<ApiResult> => {
        return {
            data: null,
            message: '',
            errorCode: 0
        };
    }

    put = async (url: string, data: any): Promise<ApiResult> => {
        return {
            data: null,
            message: '',
            errorCode: 0
        };
    }

    delete = async (url: string): Promise<ApiResult> => {
        return {
            data: null,
            message: '',
            errorCode: 0
        };
    }
}
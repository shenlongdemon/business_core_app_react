/*
    Using typed-rest-client at https://github.com/Microsoft/typed-rest-client
*/

import { IWebApi } from "../../webapi";
import { ApiResult } from "../../webapi/apiresult";
import { injectable } from "inversify";
import { ErrorResult } from "../../models";
import { HTTPC_CODE, API_STATUS_CODE, CONSTANTS } from "../../common/constants";
import axios from 'axios';
@injectable()
export class AxiosWebApi implements IWebApi{

    private static readonly USER_AGENT: string = 'phoenix-api';

    private handleBusiness? : (error: ErrorResult) => void;
    private handleException? : (error: ErrorResult) => void;

    constructor() {
        
    }

    handleExceptionError = (handle: (error: ErrorResult) => void): void => {
        this.handleBusiness = handle;
    }

    handleBusinessError = (handle: (error: ErrorResult) => void): void =>{
        this.handleException = handle;
    }

    get = async (url: string): Promise<ApiResult> => {
        
        return {
            data: null,
            message: '',
            statusCode: 0
        };
    }

    post = async (url: string, data: any): Promise<ApiResult> => {
        try {
            let response = await axios.post<ApiResult>(url, data);
            if (response.status !== HTTPC_CODE.OK && this.handleException) {
                this.handleException({
                    businessCode: API_STATUS_CODE.EXCEPTION,
                    error: response.data,
                    httpCode: response.status,
                    message: response.statusText
                });
            }
            let apiResult = response.data;
            if (apiResult.statusCode !== HTTPC_CODE.OK && this.handleBusiness) {
                this.handleBusiness({
                    businessCode: apiResult.statusCode,
                    error: apiResult.data,
                    httpCode: HTTPC_CODE.OK,
                    message: apiResult.message
                });
            }

            return apiResult;
        }
        catch(e) {
            let errorResilt: ErrorResult = this.transform(e);
            if (this.handleException) {
                this.handleException(errorResilt);
            }
            return {
                data: e,
                message: CONSTANTS.STR_EMPTY,
                statusCode: API_STATUS_CODE.EXCEPTION
            };
        }
    }

    put = async (url: string, data: any): Promise<ApiResult> => {
        return {
            data: null,
            message: '',
            statusCode: 0
        };
    }

    delete = async (url: string): Promise<ApiResult> => {
        return {
            data: null,
            message: '',
            statusCode: 0
        };
    }

    private transform = (error: any): ErrorResult => {
        let errorResilt: ErrorResult;
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            errorResilt = {
                businessCode:   API_STATUS_CODE.EXCEPTION,
                error:          error.response.data,
                httpCode:       error.response.status,
                message:        error.response.statusText
            };
            
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            errorResilt = {
                businessCode:   API_STATUS_CODE.EXCEPTION,
                error:          error.request,
                httpCode:       HTTPC_CODE.NOT_RECEIVED,
                message:        CONSTANTS.STR_EMPTY
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            errorResilt = {
                businessCode:   API_STATUS_CODE.EXCEPTION,
                error:          error,
                httpCode:       HTTPC_CODE.NOT_RECEIVED,
                message:        error.message
            };
        }
        return errorResilt;
    }
}
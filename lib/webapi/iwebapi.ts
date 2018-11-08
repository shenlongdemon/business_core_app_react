/// <reference path="../infrastructure/webapi/axioswebapi.ts" />

import {ApiResult} from "./apiresult";
import {ErrorResult} from '../models';

export interface IWebApi {

    /**
     * set header on runtime
     * @param genHeader
     */
    setGenHeader(genHeader: () => Promise<any>): void;

    /**
     * If we didn't set it, please handle after webapi returns data
     * @param handle callback function to handle error for business error.
     */
    handleBusinessError(handle: (error: ErrorResult) => void): void;

    /**
     * If we didn't set it, please handle after webapi returns data
     * @param handle callback function to handle error for http error.
     */
    handleExceptionError(handle: (error: ErrorResult) => void): void;

    get(url: string): Promise<ApiResult>;

    post(url: string, data: any): Promise<ApiResult>;

    put(url: string, data: any): Promise<ApiResult>;

    delete(url: string): Promise<ApiResult>;

}
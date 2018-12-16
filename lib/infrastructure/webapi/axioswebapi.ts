/*
    Using typed-rest-client at https://github.com/Microsoft/typed-rest-client
*/

import {IWebApi, ApiResult} from "../..//webapi";
import {injectable} from "inversify";
import {ErrorResult} from "../../models";
import {HTTPC_CODE, API_STATUS_CODE, CONSTANTS} from "../../common/constants";
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

@injectable()
export class AxiosWebApi implements IWebApi {
  private static readonly USER_AGENT: string = "phoenix-api";
  
  private handleBusiness?: (error: ErrorResult) => void;
  private handleException?: (error: ErrorResult) => void;
  private genHeader?: () => Promise<any>;
  
  constructor() {
  }
  
  setGenHeader(genHeader: () => Promise<any>): void {
    this.genHeader = genHeader;
  }
  
  handleExceptionError = (handle: (error: ErrorResult) => void): void => {
    this.handleException = handle;
  };
  
  handleBusinessError = (handle: (error: ErrorResult) => void): void => {
    this.handleBusiness = handle;
  };
  
  async get(url: string): Promise<ApiResult> {
    let apiResult: ApiResult;
    try {
      const instance: AxiosInstance = await this.getInstance();
      const response: AxiosResponse<ApiResult> = await instance.get<ApiResult>(
        url
      );
      
      apiResult = this.handle(response);
    } catch (e) {
      apiResult = this.catchException(e);
    }
    
    return apiResult;
  }
  
  async request(url: string): Promise<ApiResult> {
    let apiResult: ApiResult;
    try {
      const instance: AxiosInstance = await this.getInstance();
      const response: AxiosResponse<any> = await instance.get<ApiResult>(url);
      
      apiResult = {
        data: response.data,
        message: response.statusText,
        code: API_STATUS_CODE.OK
      };
    } catch (e) {
      apiResult = this.catchException(e);
    }
    
    return apiResult;
  }
  
  async post(url: string, data: any): Promise<ApiResult> {
    let apiResult: ApiResult;
    try {
      const instance: AxiosInstance = await this.getInstance();
      const response: AxiosResponse<ApiResult> = await instance.post<ApiResult>(
        url,
        data
      );
      
      apiResult = this.handle(response);
    } catch (e) {
      apiResult = this.catchException(e);
    }
    
    return apiResult;
  }
  
  async put(url: string, data: any): Promise<ApiResult> {
    return {
      data: null,
      message: "",
      code: 0
    };
  }
  
  async delete(url: string): Promise<ApiResult> {
    return {
      data: null,
      message: "",
      code: 0
    };
  }
  //
  // uploadFile = async (url: string, fileData: any, fileName: string, fileType: string): Promise<any> => {
  //  
  //   const body: FormData = new FormData();
  //   body.append('file', `data:image/png;base64,${fileData.data}`);
  //   body.append('name', 'file.jpg');
  //  
  //   const xhr: XMLHttpRequest = new XMLHttpRequest();
  //   xhr.open('POST', url);
  //   xhr.send(body);
  // }
  
  async uploadFiles(url: string, fileUris: string[], fileNames: string[], fileTypes: string[]): Promise<any> {
    
    
    let apiResult: ApiResult;
    try {
      const requests: Promise<AxiosResponse<any>>[] = fileUris.map(
        async (uri: any, index: number) => {
          const instance: AxiosInstance = await this.getInstanceMultiPart();
          const formData: FormData = new FormData();
          
          const data = {
            uri: uri,
            type: fileTypes[index],
            name: fileNames[index]
          };
          
          // @ts-ignore
          formData.append("files", data);
          formData.append('type', fileTypes[index])
          return instance.post(url, formData);
        }
      );
      
      const responses: AxiosResponse<any>[] = await axios.all(requests);
      apiResult = {
        data: responses,
        message: CONSTANTS.STR_EMPTY,
        code: API_STATUS_CODE.OK
      };
    } catch (e) {
      apiResult = this.catchException(e);
    }
    
    return apiResult;
  }
  
  private transform = (error: any): ErrorResult => {
    let errorResilt: ErrorResult;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // error.response.data;
      // error.response.status;
      // error.response.headers;
      errorResilt = {
        businessCode: API_STATUS_CODE.EXCEPTION,
        error: error.response.data,
        httpCode: error.response.status,
        message: error.response.statusText,
        __debug: error
      };
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      errorResilt = {
        businessCode: API_STATUS_CODE.EXCEPTION,
        error: error.request,
        httpCode: HTTPC_CODE.NOT_RECEIVED,
        message: error.message,
        __debug: error
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      errorResilt = {
        businessCode: API_STATUS_CODE.EXCEPTION,
        error: error,
        httpCode: HTTPC_CODE.NOT_RECEIVED,
        message: error.message,
        __debug: error
      };
    }
    return errorResilt;
  };
  
  private catchException = (e: any): ApiResult => {
    if (this.handleException) {
      let errorResilt: ErrorResult = this.transform(e);
      this.handleException(errorResilt);
    }
    const apiResult = {
      data: e,
      message: CONSTANTS.STR_EMPTY,
      code: API_STATUS_CODE.EXCEPTION
    };
    
    return apiResult;
  };
  
  private handle = (response: AxiosResponse<ApiResult>): ApiResult => {
    var apiResult: ApiResult;
    
    if (response.status !== HTTPC_CODE.OK && this.handleException) {
      this.handleException({
        businessCode: API_STATUS_CODE.EXCEPTION,
        error: response.data,
        httpCode: response.status,
        message: response.statusText,
        __debug: response
      });
      apiResult = {
        data: response.data,
        message: response.statusText,
        code: API_STATUS_CODE.EXCEPTION
      };
    } else {
      apiResult = response.data;
      if (apiResult.code !== API_STATUS_CODE.OK && this.handleBusiness) {
        this.handleBusiness({
          businessCode: apiResult.code,
          error: apiResult.data,
          httpCode: HTTPC_CODE.OK,
          message: apiResult.message,
          __debug: response
        });
      }
    }
    return apiResult;
  };
  
  private getInstance = async (): Promise<AxiosInstance> => {
    let headers: any = {};
    if (this.genHeader) {
      headers = await this.genHeader();
    }
    const config: AxiosRequestConfig = {
      headers: headers,
      timeout: 30000
    };
    const instance: AxiosInstance = axios.create(config);
    
    return instance;
  };
  
  private async getInstanceMultiPart(): Promise<AxiosInstance> {
    let headers: any = {};
    if (this.genHeader) {
      headers = await this.genHeader();
    }
    headers['Content-Type'] = 'application/octet-stream';
    
    const config: AxiosRequestConfig = {
      headers: headers,
      timeout: 330000
    };
    
    const instance: AxiosInstance = axios.create(config);
    
    return instance;
  }
  
  
}

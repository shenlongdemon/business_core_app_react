import { BaseRepository } from "./baserepository";
import {
  IBusinessRepo,
  GoodsListSdo,
  ProcessListSdo,
  WeatherDataSdo,
  ObjectOfQRCodeRequest,
  BaseSdo,
  ObjectByCodeSdo
} from "../../repositories";
import { inject, injectable } from "inversify";
import { IWebApi, ApiResult } from "../../webapi";
import { PUBLIC_TYPES, PRIVATE_TYPES } from "../identifiers";
import { STORAGE_KEYS, CONSTANTS, API } from "../../common";
import {Animated} from "react-native";

@injectable()
export class BusinessRepo extends BaseRepository implements IBusinessRepo {
  @inject(PUBLIC_TYPES.IWebApi) private api!: IWebApi;

  async getItems(userId: string): Promise<GoodsListSdo> {
    const res: ApiResult = await this.api.get(API.GET_ITEMS(userId));
    const sdo: GoodsListSdo = {
      ...this.transform(res),
      goodses: res.data ? res.data : []
    };
    return sdo;
  }

  async getWeather(
    latitude: number,
    longitude: number
  ): Promise<WeatherDataSdo> {
    const res: ApiResult = await this.api.request(
      API.GET_WEATHER(latitude, longitude)
    );
    const sdo: WeatherDataSdo = {
      ...this.transform(res),
      weather: res.data
    };

    return sdo;
  }

  async getObjectByCode(code: string): Promise<ObjectByCodeSdo> {
    const req: ObjectOfQRCodeRequest = {
      code: code
    };
    const res: ApiResult = await this.api.post(API.GET_OBJECT_BY_CODE(), req);
    const sdo: ObjectByCodeSdo = {
      ...this.transform(res),
      object: res.data
    };

    return sdo;
  }
  
  uploadImage = async (imageName: string, imageUri: string): Promise<BaseSdo> => {
    const fileNames: string[] = [imageName];
    const fileUris: string[] = [imageUri];
    const fileTypes: string[] = ['image/png'];
    const res: ApiResult = await  this.api.uploadFiles(API.UPLOAD_FILES(), fileUris, fileNames, fileTypes);
    const sdo: BaseSdo = {
      ...this.transform(res)
    };
  
    return sdo;
  }
  
  uploadFiles = async (fileUris:string[], fileNames: string[], fileTypes: string[], ): Promise<BaseSdo> => {
    const res: ApiResult = await  this.api.uploadFiles(API.UPLOAD_FILES(), fileUris, fileNames, fileTypes);
    const sdo: BaseSdo = {
      ...this.transform(res)
    };
    
    return sdo;
  }
}

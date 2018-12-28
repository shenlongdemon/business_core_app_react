import { BaseRepository } from "./baserepository";
import {
  IBusinessRepo,
  GoodsListSdo,
  WeatherDataSdo,
  ObjectOfQRCodeRequest,
  BaseSdo,
  ObjectByCodeSdo,
  CodeDescriptionSdo,
  ListObjectsByIdsSdo,
  GetCategoriesSdo,
  ItemDetailSdo
} from "../../repositories";
import { inject, injectable } from "inversify";
import { IWebApi, ApiResult } from "../../webapi";
import { PUBLIC_TYPES } from "../identifiers";
import {API } from "../../common";

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
  
  getCodeDescription = async (code: string): Promise<CodeDescriptionSdo> => {
    const res: ApiResult = await  this.api.post(API.GeT_CODE_DESCRIPTION(), {code});
    
    return {
      ...this.transform(res),
      description: res.data
    };
  }
  
  getObjectsByBluetoothIds = async (ids: string[]): Promise<ListObjectsByIdsSdo> => {
    const res: ApiResult = await  this.api.post(API.GET_OBJECTS_BY_BLUETOOTH_IDS(), {ids});
  
    return {
      ...this.transform(res),
      items: res.data
    };
  }
  
  getCategories = async (): Promise<GetCategoriesSdo> => {
    const res: ApiResult = await  this.api.get(API.GET_CATEGORIES());
  
    return {
      ...this.transform(res),
      categories: res.data
    };
  }
  
  getItem = async (id: string): Promise<ItemDetailSdo> => {
    const res: ApiResult = await  this.api.get(API.GET_ITEM_BY_ID(id));
  
    return {
      ...this.transform(res),
      item: res.data
    };
  }
}

import {BaseRepository} from './baserepository';
import {IBusinessRepo, GoodsListSdo, ObjectOfQRCodeSdo, ProcessListSdo, WeatherDataSdo, ObjectOfQRCodeRequest} from '../../repositories';
import {inject, injectable} from "inversify";
import {IWebApi, ApiResult} from '../../webapi';
import {PUBLIC_TYPES, PRIVATE_TYPES} from '../identifiers';
import {STORAGE_KEYS, CONSTANTS, API} from '../../common';


@injectable()
export class BusinessRepo extends BaseRepository implements IBusinessRepo {
  
  @inject(PUBLIC_TYPES.IWebApi) private api!: IWebApi;
  
  async getItems(userId: string): Promise<GoodsListSdo> {
    const res: ApiResult = await this.api.get(API.GET_ITEMS(userId));
    const sdo: GoodsListSdo = {
      ...this.transform(res),
      goodses: res.Data ? res.Data : []
    };
    return sdo;
  }
  
  async getProcesses(userId: string): Promise<ProcessListSdo> {
    const res: ApiResult = await this.api.get(API.GET_PROCESSES(userId));
    const sdo: ProcessListSdo = {
      ...this.transform(res),
      processes: res.Data ? res.Data : []
    };
    return sdo;
  }
  
  async getWeather(latitude: number, longitude: number): Promise<WeatherDataSdo> {
    const res: ApiResult = await this.api.request(API.GET_WEATHER(latitude, longitude));
    const sdo: WeatherDataSdo = {
      ...this.transform(res),
      weather: res.Data
    };
    
    return sdo;
  }
  
  async getObjectByQRCode(code: string): Promise<ObjectOfQRCodeSdo> {
    const req: ObjectOfQRCodeRequest = {
      code: code
    };
    const res: ApiResult = await this.api.post(API.GET_OBJECT_BY_QRCODE(), req);
    const sdo: ObjectOfQRCodeSdo = {
      ...this.transform(res),
      object: res.Data
    };
  
    return sdo;
  }
  
}

///<reference path="../infrastructure/repositpries/businessrepo.ts"/>


import {GoodsListSdo, ObjectOfQRCodeSdo, ProcessListSdo, WeatherDataSdo} from './sdo';

export interface IBusinessRepo {
  
  getObjectByQRCode(code: string): Promise<ObjectOfQRCodeSdo>;
  
  getWeather(latitude: number, longitude: number): Promise<WeatherDataSdo>;
  
  getItems(userId: string): Promise<GoodsListSdo>;
  
  getProcesses(userId: string): Promise<ProcessListSdo>
}
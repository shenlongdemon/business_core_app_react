///<reference path="../infrastructure/repositpries/businessrepo.ts"/>

import {
  GoodsListSdo,
  ObjectOfQRCodeSdo,
  WeatherDataSdo,
  BaseSdo
} from "./sdo";

export interface IBusinessRepo {
  uploadImage(imageName: string, imageUri: string): Promise<BaseSdo>;
  
  getObjectByQRCode(code: string): Promise<ObjectOfQRCodeSdo>;

  getWeather(latitude: number, longitude: number): Promise<WeatherDataSdo>;

  getItems(userId: string): Promise<GoodsListSdo>;
  
  uploadFiles (fileUris:string[], fileNames: string[], fileTypes: string[], ): Promise<BaseSdo>;
  
}

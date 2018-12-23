///<reference path="../infrastructure/repositpries/businessrepo.ts"/>

import {
  GoodsListSdo,
  ObjectByCodeSdo,
  WeatherDataSdo,
  BaseSdo
} from "./sdo";

export interface IBusinessRepo {
  uploadImage(imageName: string, imageUri: string): Promise<BaseSdo>;
  
  getObjectByCode(code: string): Promise<ObjectByCodeSdo>;

  getWeather(latitude: number, longitude: number): Promise<WeatherDataSdo>;

  getItems(userId: string): Promise<GoodsListSdo>;
  
  uploadFiles (fileUris:string[], fileNames: string[], fileTypes: string[], ): Promise<BaseSdo>;
  
}

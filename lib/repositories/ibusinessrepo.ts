///<reference path="../infrastructure/repositpries/businessrepo.ts"/>

import {
  GoodsListSdo,
  ObjectByCodeSdo,
  WeatherDataSdo,
  BaseSdo,
  CodeDescriptionSdo,
  ListObjectsByIdsSdo,
  GetCategoriesSdo,
  ItemDetailSdo
} from "./sdo";

export interface IBusinessRepo {
  getItem(id: string): Promise<ItemDetailSdo>;
  
  getCategories(): Promise<GetCategoriesSdo>;
  
  getObjectsByBluetoothIds(ids: string[]): Promise<ListObjectsByIdsSdo>;
  
  getCodeDescription(code: string): Promise<CodeDescriptionSdo>;
  
  uploadImage(imageName: string, imageUri: string): Promise<BaseSdo>;
  
  getObjectByCode(code: string): Promise<ObjectByCodeSdo>;
  
  getWeather(latitude: number, longitude: number): Promise<WeatherDataSdo>;
  
  getItems(userId: string): Promise<GoodsListSdo>;
  
  uploadFiles(fileUris: string[], fileNames: string[], fileTypes: string[],): Promise<BaseSdo>;
  
}

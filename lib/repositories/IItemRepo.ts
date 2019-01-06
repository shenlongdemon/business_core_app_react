///<reference path="../infrastructure/repositpries/ItemRepo.ts"/>

import {
  BaseSdo,
  ItemActionSdo,
  GoodsListSdo
} from "./sdo";

export interface IItemRepo {
  getProducts(categoryId: string): Promise<GoodsListSdo>;
  
  doItemAction(itemId: string, action: number, userInfo: any): Promise<ItemActionSdo>;
  
  addMaintain(itemId: string, title: string, description: string, image: string, file: string, userInfo: any): Promise<BaseSdo>;
  
  createItem(name: string, price: number, description: string, imageName: string, category: any, bluetooth: any | null, material: any | null, userInfo: any): BaseSdo | PromiseLike<BaseSdo>;
}

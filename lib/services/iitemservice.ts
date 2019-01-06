///<reference path="../infrastructure/services/ItemService.ts"/>

import {
  ItemActionDto, BaseDto, ItemListDto
} from "./dto";
import {Material, Category, Bluetooth} from "../models";
import {ITEM_ACTION} from "../common";

export interface IItemService {
  getProducts(categoryId: string): Promise<ItemListDto>;
  
  doItemAction(itemId: string, action: ITEM_ACTION): Promise<ItemActionDto>
  
  createItem(
    category: Category,
    name: string,
    price: number,
    description: string,
    imageUri: string,
    bluetooth: Bluetooth | null,
    material: Material | null
  ): Promise<BaseDto>;
  
  addMaintain(
    itemId: string,
    title: string,
    description: string,
    imageUri: string,
    file: string
  ): Promise<BaseDto>;
}

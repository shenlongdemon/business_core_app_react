import {BaseRepository} from './baserepository';
import {
  BaseSdo, CreateItemRequest,
  IItemRepo,
  GoodsListSdo,
  
} from '../../repositories';
import {inject, injectable} from 'inversify';
import {IWebApi, ApiResult} from '../../webapi';
import {PUBLIC_TYPES} from '../identifiers';
import {API} from '../../common';
import {ItemActionSdo} from '../../repositories';

@injectable()
export class ItemRepo extends BaseRepository implements IItemRepo {
  
  @inject(PUBLIC_TYPES.IWebApi) private api!: IWebApi;
  
  doItemAction = async (itemId: string, action: number, userInfo: any): Promise<ItemActionSdo> => {
    const res: ApiResult = await this.api.post(API.DO_ITEM_ACtion(), {id: itemId, action, userInfo});
    return {
      ...this.transform(res),
      item: res.data
    };
  }
  
  createItem = async (
    name: string,
    price: number,
    description: string,
    imageName: string,
    category: any,
    bluetooth: any | null,
    material: any | null,
    userInfo: any
  ): Promise<BaseSdo> => {
    const req: CreateItemRequest = {
      name,
      price,
      description,
      imageUrl: imageName,
      bluetooth,
      material,
      category,
      owner: userInfo
    };
    const res: ApiResult = await this.api.post(API.CREATE_ITEM(), req);
    return {
      ...this.transform(res)
    };
  };
  
  addMaintain = async (
    itemId: string,
    title: string,
    description: string,
    image: string,
    file: string,
    userInfo: any
  ): Promise<BaseSdo> => {
    const res: ApiResult = await this.api.post(API.ADD_MAINTAIN(), {
      itemId,
      title,
      description,
      image,
      file,
      userInfo
    });
    return {
      ...this.transform(res)
    };
  };
  
  getProducts = async (categoryId: string): Promise<GoodsListSdo> => {
    const res: ApiResult = await this.api.get(API.GET_PRODUCTS(categoryId));
    const sdo: GoodsListSdo = {
      ...this.transform(res),
      goodses: res.data ? res.data : []
    };
    return sdo;
  }
  
}

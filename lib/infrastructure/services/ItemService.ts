import {
  IItemService, ItemActionDto, IBusinessService,
  BaseDto,
  ItemListDto
} from "../../services";
import { Item, UserInfo, Category, Bluetooth, Material} from "../../models";
import {CONSTANTS, ITEM_ACTION} from "../../common";
import { ItemActionSdo, IItemRepo, BaseSdo, IBusinessRepo, GoodsListSdo} from "../../repositories";
import {injectable, inject} from "inversify";
import {PUBLIC_TYPES, PRIVATE_TYPES} from "../identifiers";
import {BaseService} from "./baseservice";

@injectable()
export class ItemService extends BaseService implements IItemService {
  @inject(PRIVATE_TYPES.IItemRepo) private itemRepo!: IItemRepo;
  @inject(PRIVATE_TYPES.IBusinessRepo) private businessRepo!: IBusinessRepo;
  @inject(PUBLIC_TYPES.IBusinessService) private businessService!: IBusinessService;
  
  doItemAction = async (itemId: string, action: ITEM_ACTION): Promise<ItemActionDto> => {
    const userInfo: UserInfo = await this.businessService.getUserInfo();
    const sdo: ItemActionSdo = await this.itemRepo.doItemAction(itemId, action, userInfo);
    
    let item: Item | null = null;
    if (sdo.isSuccess) {
      item = this.mappingObject<Item>(sdo.item);
    }
    
    return {
      ...this.populate(sdo),
      item
    }
  }
  createItem = async (
    category: Category,
    name: string,
    price: number,
    description: string,
    imageUri: string,
    bluetooth: Bluetooth | null,
    material: Material | null
  ): Promise<BaseDto> => {
    
    const userInfo: UserInfo = await this.businessService.getUserInfo();
    let imageName: string = CONSTANTS.STR_EMPTY;
    if (imageUri !== CONSTANTS.STR_EMPTY) {
      imageName = this.genImageName();
      await this.businessRepo.uploadImage(imageName, imageUri);
    }
    
    const res: BaseSdo = await this.itemRepo.createItem(
      name,
      price,
      description,
      imageName,
      category,
      bluetooth,
      material,
      userInfo
    );
    
    
    return {
      ...this.populate(res)
    };
  }
  
  addMaintain = async (itemId: string, title: string, description: string, imageUri: string,
                       fileUri: string): Promise<BaseDto> => {
    const fileNames: string[] = [];
    const fileTypes: string[] = [];
    const fileUris: string[] = [];
    let image: string = CONSTANTS.STR_EMPTY;
    let file: string = CONSTANTS.STR_EMPTY;
    if (imageUri !== CONSTANTS.STR_EMPTY) {
      const name: string = this.genImageName();
      fileUris.push(imageUri);
      fileNames.push(name);
      fileTypes.push('image/png');
      image = name;
    }
    
    if (fileUri !== CONSTANTS.STR_EMPTY) {
      const name: string = this.genPDFName();
      fileUris.push(fileUri);
      fileNames.push(name);
      fileTypes.push('application/pdf');
      file = name;
    }
    if (fileUris.length > 0) {
      await this.businessRepo.uploadFiles(fileUris, fileNames, fileTypes);
    }
    const userInfo: UserInfo = await this.businessService.getUserInfo();
    const sdo: BaseSdo = await this.itemRepo.addMaintain(
      itemId,
      title,
      description,
      image,
      file,
      userInfo
    );
    
    return {...this.populate(sdo)};
  }
  
  getProducts = async (categoryId: string): Promise<ItemListDto> => {
    const sdo: GoodsListSdo = await this.itemRepo.getProducts(categoryId);
    let items: Item[] = [];
    if (sdo.isSuccess && sdo.goodses) {
      items = this.mappingList<Item>(sdo.goodses);
    }
    return {
      ...this.populate(sdo),
      items
    };
  }
  
}

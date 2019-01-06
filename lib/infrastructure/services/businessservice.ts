import {
  CodeDescriptionDto,
  GetCategoriesDto,
  IBusinessService,
  ItemDetailDto,
  ItemListDto,
  ListObjectsByIdsDto,
  ObjectByCodeDto
} from "../../services";
import {
  Activity,
  AttachFile,
  Category,
  DynProperty,
  DynPropertyType,
  Item,
  Material,
  ObjectByCode,
  Position,
  Process,
  User,
  ItemAction, UserInfo, Weather
} from "../../models";
import {inject, injectable} from "inversify";
import {PRIVATE_TYPES, PUBLIC_TYPES} from "../identifiers";
import {
  CodeDescriptionSdo,
  GetCategoriesSdo,
  GoodsListSdo,
  IBusinessRepo,
  IStore,
  ItemDetailSdo,
  ListObjectsByIdsSdo,
  ObjectByCodeSdo, WeatherDataSdo
} from "../../repositories";
import {BaseService} from "./baseservice";
import {CONSTANTS, ITEM_ACTION} from "../../common";
import {ENV} from "../../config";
import {LOGGER} from "../../logger";
import moment from "moment";
import {Feature, Point} from "@turf/helpers";
import * as turf from "@turf/turf";
// @ts-ignore
const uuidv4 = require('uuid/v4');

@injectable()
export class BusinessService extends BaseService implements IBusinessService {
  @inject(PRIVATE_TYPES.IBusinessRepo) private businessRepo!: IBusinessRepo;
  @inject(PUBLIC_TYPES.IStore) private store!: IStore;
  
  async getItems(): Promise<ItemListDto> {
    const userId: string = await this.getUserId();
    const res: GoodsListSdo = await this.businessRepo.getItems(userId);
    let items: Item[] = [];
    if (res.isSuccess && res.goodses) {
      items = this.mappingItems(res.goodses);
    }
    
    const itemListDto: ItemListDto = {
      ...this.populate(res),
      items: items
    };
    
    return itemListDto;
  }
  
  async getObjectByCode(code: string): Promise<ObjectByCodeDto> {
    const res: ObjectByCodeSdo = await this.businessRepo.getObjectByCode(
      code
    );
    let item: ObjectByCode | null = null;
    if (res.isSuccess && res.object) {
      item = this.mappingObject(res.object);
    }
    
    const dto: ObjectByCodeDto = {
      ...this.populate(res),
      item: item
    };
    
    return dto;
  }
  
  getLink(relative: string): string {
    const link: string = `${ENV.HOST}/sellrecognizer/${relative}`;
    LOGGER.log(link);
    return link;
  }
  
  
  getCurrentPosition = async (): Promise<Position> => {
    const position: Position = await this.store.getCurrentPosition();
    return position;
  };
  
  getUser = async (): Promise<User> => {
    const user: User | null = await this.store.getUser();
    return user!;
  };
  
  toDateString(time: number): string {
    const date: string = moment(time).format(CONSTANTS.DATE_FORMAT);
    return date;
  }
  
  toTimeString(time: number): string {
    const str: string = moment(time).format(CONSTANTS.TIME_FORMAT);
    return str;
  }
  
  async saveCurrentPosition(position: Position): Promise<void> {
    await this.store.saveCurrentPosition(position);
  }
  
  
  private getUserId = async (): Promise<string> => {
    const user: User | null = await this.store.getUser();
    let userId: string = CONSTANTS.STR_EMPTY;
    if (user) {
      userId = user.id;
    }
    return userId;
  };
  
  getCodeDescription = async (code: string): Promise<CodeDescriptionDto> => {
    const sdo: CodeDescriptionSdo = await this.businessRepo.getCodeDescription(code);
    let description: string = CONSTANTS.STR_EMPTY;
    if (sdo.isSuccess && sdo.description) {
      description = sdo.description as string;
    }
    return {
      ...this.populate(sdo),
      description
    };
  }
  
  getActivities = (material: Material): Activity[] => {
    const activities: Activity[] = [];
    material.processes.forEach((process: Process): void => {
      activities.push.apply(activities, process.activities);
    });
    return activities;
  }
  
  getObjectsByBluetoothIds = async (ids: string[]): Promise<ListObjectsByIdsDto> => {
    const sdo: ListObjectsByIdsSdo = await this.businessRepo.getObjectsByBluetoothIds(ids);
    let items: ObjectByCode[] = [];
    if (sdo.isSuccess && sdo.items) {
      items = this.mappingList(sdo.items);
    }
    
    return {
      ...this.populate(sdo),
      items: items
    };
  }
  
  getCategories = async (): Promise<GetCategoriesDto> => {
    const sdo: GetCategoriesSdo = await this.businessRepo.getCategories();
    let categories: Category[] = [];
    if (sdo.isSuccess && sdo.categories) {
      categories = this.mappingList(sdo.categories);
    }
    
    return {
      ...this.populate(sdo),
      categories: categories
    };
  }
  
  getItem = async (id: string): Promise<ItemDetailDto> => {
    const sdo: ItemDetailSdo = await this.businessRepo.getItem(id);
    let item: Item | null = null;
    if (sdo.isSuccess && sdo.item) {
      item = this.mappingObject(sdo.item);
    }
    
    return {
      ...this.populate(sdo),
      item
    };
  }
  
  getAttachFiles = (item: Item): AttachFile[] => {
    const files: AttachFile[] = [];
    if (item.material) {
      item.material.processes.forEach((prpcess: Process): void => {
        
        const imagesOfProcess: AttachFile[] = prpcess.dynProperties.filter((p: DynProperty): boolean => {
          return p.type === DynPropertyType.FILE && p.value !== CONSTANTS.STR_EMPTY
        }).map((p: DynProperty): AttachFile => {
          return {
            id: p.id,
            description: prpcess.name,
            link: p.value,
            time: prpcess.updateAt
          };
        });
        
        files.push.apply(files, imagesOfProcess);
        
        const fs: AttachFile[] = prpcess.activities.filter((act: Activity): boolean => {
          return act.file !== CONSTANTS.STR_EMPTY;
        }).map((act: Activity): AttachFile => {
          return {
            id: act.id,
            description: act.title,
            link: act.file,
            time: act.time
          };
        });
        files.push.apply(files, fs);
      });
    }
    return files.filter((file: AttachFile): boolean => {
      return file.link !== CONSTANTS.STR_EMPTY;
    }).map((attachFile: AttachFile): AttachFile => {
      return {
        ...attachFile,
        link: this.getLink(attachFile.link)
      }
    });
  }
  
  getImages(item: Item): string[] {
    const files: string[] = [];
    if (item.material) {
      files.push(item.material.imageUrl);
      item.material.processes.forEach((p: Process): void => {
        
        const imagesOfProcess: string[] = p.dynProperties.filter((p: DynProperty): boolean => {
          return p.type === DynPropertyType.IMAGE && p.value !== CONSTANTS.STR_EMPTY
        }).map((p: DynProperty): string => {
          return p.value
        });
        
        files.push.apply(files, imagesOfProcess);
        
        const fs: string[] = p.activities.map((act: Activity): string => {
          return act.image;
        });
        files.push.apply(files, fs);
      });
    }
    return files.filter((file: string): boolean => {
      return file !== CONSTANTS.STR_EMPTY;
    }).map((link: string): string => {
      return this.getLink(link);
    });
  }
  
  toDateTimeString(time: number): string {
    return `${this.toDateString(time)} ${this.toTimeString(time)}`;
  }
  
  getAllActivities(item: Item): Activity[] {
    const activities: Activity[] = [];
    if (item.material) {
      item.material.processes.forEach((process: Process): void => {
        activities.push.apply(activities, process.activities);
      });
    }
    activities.push.apply(activities, item.maintains);
    
    return activities.sort((a: Activity, b: Activity): number => {
      return b.time - a.time;
    });
  }
  
  getActivitiesPositions(item: Item): Feature<Point | null>[] {
    const activities: Activity[] = this.getAllActivities(item);
    const points: Feature<Point | null>[] = activities.map((act: Activity): Feature<Point | null> => {
      const position: Position = act.userInfo.position;
      return turf.point([position.longitude, position.latitude], {'title': act.title, 'id': act.id}, {id: act.id});
    });
    
    return points;
  }
  getUserInfo = async (): Promise<UserInfo> => {
    console.log('BEGIN getUserInfo at ' + Date.now());
    const position: Position | null = await this.store.getCurrentPosition();
    console.log('BEGIN getUserInfo at ' + Date.now() + ' curent position ' + position);
    const weather: Weather = await this.getWeather(position!.latitude, position!.longitude);
    console.log('BEGIN getUserInfo at ' + Date.now() + ' ưeather ' + weather);
    
    const user: User | null = await this.store.getUser();
    
    const userInfo: UserInfo = {
      ...user!,
      code: CONSTANTS.STR_EMPTY,
      position: position!,
      weather: weather,
      time: Date.now(),
      index: 0
    };
    console.log('BEGIN getUserInfo at ' + Date.now());
    
    return userInfo;
  };
  
  private getWeather = async (latitude: number, longitude: number): Promise<Weather> => {
    console.log('BEGIN getWeather at ' + Date.now());
    
    const res: WeatherDataSdo = await this.businessRepo.getWeather(latitude, longitude);
    const weather: Weather = this.mappingWeather(res.weather);
    console.log('END getWeather at ' + Date.now());
    
    return weather;
  };
  
  
  
  getItemAction = async (item: Item): Promise<ItemAction> => {
    const itemAction: ItemAction = {
      action : ITEM_ACTION.NONE,
      text: CONSTANTS.STR_EMPTY,
      color: CONSTANTS.STR_EMPTY,
    };
    const user: User | null = await this.store.getUser();
    if (!user) {
      return itemAction;
    }
    
    if (item.sellCode !== CONSTANTS.STR_EMPTY) { // item is published
      if (item.buyer) { // item is sold
        if (item.buyer!.id === user.id) { // i am buyer
          itemAction.action = ITEM_ACTION.RECEIVE;
          itemAction.text = 'RECEIVE';
          itemAction.color = '#019f00';
          
        }
        else if (item.owner.id === user.id) { // i am owner
          itemAction.action = ITEM_ACTION.NONE;
        }
      }
      else { // item is published and is not bought yet
        if (item.owner.id === user.id) { // i am owner
          itemAction.action = ITEM_ACTION.CANCEL;
          itemAction.text = 'CANCEL';
          itemAction.color = '#9f000a';
        }
        else { // i am not owner so i can buy it
          itemAction.action = ITEM_ACTION.BUY;
          itemAction.text = 'BUY';
          itemAction.color = '#d77b14';
        }
      }
    }
    else if (item.owner.id === user.id) { // i am owner and not publish yet
      itemAction.action = ITEM_ACTION.PUBLISH;
      itemAction.text = 'PUBLISH';
      itemAction.color = '#005a9f';
    }
    
    return itemAction;
  }
  
  isMyItem= async(item: Item): Promise<boolean> =>{
    const user: User | null  = await this.store.getUser();
    if (!user) {
      return false;
    }
    return user!.id === item.owner.id;
  }
  
  
}

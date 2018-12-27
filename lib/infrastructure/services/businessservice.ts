import {
  IBusinessService,
  ItemListDto,
  ObjectByCodeDto,
  CodeDescriptionDto,
  ListObjectsByIdsDto,
  GetCategoriesDto
} from "../../services";
import {
  Item,
  User,
  ObjectByCode,
  Position,
  Material,
  Activity,
  Process,
  Category
} from "../../models";
import {inject, injectable} from "inversify";
import {PRIVATE_TYPES, PUBLIC_TYPES} from "../identifiers";
import {
  IBusinessRepo,
  GoodsListSdo,
  IStore,
  ObjectByCodeSdo,
  CodeDescriptionSdo,
  ListObjectsByIdsSdo,
  GetCategoriesSdo
} from "../../repositories";
import {BaseService} from "./baseservice";
import {CONSTANTS} from "../../common";
import {ENV} from "../../config";
import {LOGGER} from "../../logger";
import moment from "moment";

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
  
  getObjectsByBluetoothIds = async (ids: string[]): Promise<ListObjectsByIdsDto> =>{
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
  
  getCategories = async (): Promise<GetCategoriesDto> =>{
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
  
}

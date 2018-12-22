import {
  IBusinessService,
  ItemListDto,
  ObjectOfQRCodeDto
} from "../../services";
import {
  Item,
  User,
  ItemHistory,
  ScanQRItem,
  Position
} from "../../models";
import {inject, injectable} from "inversify";
import {PRIVATE_TYPES, PUBLIC_TYPES} from "../identifiers";
import {
  IBusinessRepo,
  GoodsListSdo,
  
  IStore,
  ObjectOfQRCodeSdo
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
  
  async getItemHistories(item: Item): Promise<ItemHistory[]> {
    const histories: ItemHistory[] = [];
    
    return histories;
  }
  
  async getObjectByQRCode(code: string): Promise<ObjectOfQRCodeDto> {
    debugger;
    const res: ObjectOfQRCodeSdo = await this.businessRepo.getObjectByQRCode(
      code
    );
    let item: ScanQRItem | null = null;
    if (res.isSuccess && res.object) {
      item = this.mappingScanQRItem(res.object);
    }
    
    const dto: ObjectOfQRCodeDto = {
      ...this.populate(res),
      object: item
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
  
}

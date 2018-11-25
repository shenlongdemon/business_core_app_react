import {
  IBusinessService,
  Item,
  Material,
  ItemListDto,
  ProcessListDto,
  User,
  ItemHistory,
  ProcessDetailDto,
  ObjectOfQRCodeDto,
  ScanQRItem,
  Position
} from '../../services'
import {inject, injectable} from 'inversify';
import {PRIVATE_TYPES, PUBLIC_TYPES} from '../identifiers';
import {IBusinessRepo, GoodsListSdo, ProcessListSdo, IStore, ObjectOfQRCodeSdo} from '../../repositories';
import {BaseService} from './baseservice';
import {CONSTANTS} from '../../common'

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
  
  async getProcesses(): Promise<ProcessListDto> {
    const userId: string = await this.getUserId();
    const res: ProcessListSdo = await this.businessRepo.getProcesses(userId);
    let materials: Material[] = [];
    if (res.isSuccess && res.materials) {
      materials = this.mappingList<Material>(res.materials);
    }
    
    const dto: ProcessListDto = {
      ...this.populate(res),
      materials: materials
    };
    
    return dto;
  }
  
  async getItemHistories(item: Item): Promise<ItemHistory[]> {
    const histories: ItemHistory[] = [];
    
    
    return histories;
  }
  
  async getObjectByQRCode(code: string): Promise<ObjectOfQRCodeDto> {
    const res: ObjectOfQRCodeSdo = await this.businessRepo.getObjectByQRCode(code);
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
  
  toDateString(time: number): string {
    const date: Date = new Date(time);
    return date.toDateString();
  }
  
  toTimeString(time: number): string {
    const date: Date = new Date(time);
    return date.toDateString();
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
  }

  
  
  
}
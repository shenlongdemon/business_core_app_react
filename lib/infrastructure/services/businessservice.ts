import {IBusinessService, Item, Process, ItemListDto, ProcessListDto, User, ItemHistory} from '../../services'
import {inject, injectable} from 'inversify';
import {PRIVATE_TYPES, PUBLIC_TYPES} from '../identifiers';
import {IBusinessRepo, GoodsListSdo, ProcessListSdo, IStore} from '../../repositories';
import {BaseService} from './baseservice';
import {CONSTANTS} from '../../common'

@injectable()
export class BusinessService extends BaseService implements IBusinessService {
    
    @inject(PRIVATE_TYPES.IBusinessRepo) private businessRepo!: IBusinessRepo;
    @inject(PUBLIC_TYPES.IStore) private store!: IStore;
    
    getItems = async (): Promise<ItemListDto> => {
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
    
    getProcesses = async (): Promise<ProcessListDto> => {
        const userId: string = await this.getUserId();
        const res: ProcessListSdo = await this.businessRepo.getProcesses(userId);
        var processes: Process[] = [];
        if (res.isSuccess && res.processes) {
            processes = this.mappingProcesses(res.processes);
        }
        
        let processesListDto: ProcessListDto = {
            ...this.populate(res),
            processes: processes
        };
        
        return processesListDto;
    }
    
    getItemHistories = async (item: Item): Promise<ItemHistory[]> => {
        const histories: ItemHistory[] = [];
        
        
        return histories;
    }
    
    private getUserId = async (): Promise<string> => {
        const user: User | null = await this.store.getUser();
        var userId: string = CONSTANTS.STR_EMPTY;
        if (user) {
            userId = user.id;
        }
        return userId;
    }
    
    
}
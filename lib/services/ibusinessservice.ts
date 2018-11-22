///<reference path="../infrastructure/services/businessservice.ts"/>


import {ItemListDto, ProcessListDto, ProcessDetailDto} from './dto'
import {Item, ItemHistory} from './model'

export interface IBusinessService {
    
    getProcessDetail(id: string): Promise<ProcessDetailDto>;
    
    getItemHistories(item: Item): Promise<ItemHistory[]>;
    
    getItems(): Promise<ItemListDto>;
    
    getProcesses(): Promise<ProcessListDto>
}
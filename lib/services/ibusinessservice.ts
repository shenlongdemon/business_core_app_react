///<reference path="../infrastructure/services/businessservice.ts"/>


import {ItemListDto, ProcessListDto, ProcessDetailDto, ObjectOfQRCodeDto} from './dto'
import {Item, ItemHistory} from './model'

export interface IBusinessService {
    
    getItemHistories(item: Item): Promise<ItemHistory[]>;
    
    getItems(): Promise<ItemListDto>;
    
    getProcesses(): Promise<ProcessListDto>
  
    getObjectByQRCode(code: string): Promise<ObjectOfQRCodeDto>;
}
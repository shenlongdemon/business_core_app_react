///<reference path="../infrastructure/services/businessservice.ts"/>


import {ItemListDto, ProcessListDto} from './dto'

export interface IBusinessService {
    getItems(): Promise<ItemListDto>;
    
    getProcesses(): Promise<ProcessListDto>
}
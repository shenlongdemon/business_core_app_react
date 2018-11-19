///<reference path="../infrastructure/services/businessservice.ts"/>


import {GoodsListDto, ProcessListDto} from './dto'

export interface IBusinessService {
    getGoods(): Promise<GoodsListDto>;
    
    getProcesses(): Promise<ProcessListDto>
}
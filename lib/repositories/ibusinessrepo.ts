///<reference path="../infrastructure/repositpries/businessrepo.ts"/>


import {GoodsListSdo, ProcessListSdo, ProcessDetailSdo} from './sdo';

export interface IBusinessRepo {
    getProcessDetail(id: string): Promise<ProcessDetailSdo>;
    
    getItems(userId: string): Promise<GoodsListSdo>;
    
    getProcesses(userId: string): Promise<ProcessListSdo>
}
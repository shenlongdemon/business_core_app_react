///<reference path="../infrastructure/repositpries/businessrepo.ts"/>


import {GoodsListSdo, ProcessListSdo} from './sdo';

export interface IBusinessRepo {
    getItems(userId: string): Promise<GoodsListSdo>;
    
    getProcesses(userId: string): Promise<ProcessListSdo>
}
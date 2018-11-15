///<reference path="../infrastructure/services/businessservice.ts"/>


import {GoodsListDto} from './dto'

export interface IBusinessService {
    getGoods(): Promise<GoodsListDto>;
}
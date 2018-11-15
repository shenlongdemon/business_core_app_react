///<reference path="../infrastructure/repositpries/businessrepo.ts"/>


import {GoodsListSdo} from './sdo/goodslistsdo';

export interface IBusinessRepo {
    getGoodses(userId: string): Promise<GoodsListSdo>;
}
import {BaseDto} from './basedto'
import {Goods} from '../model';

export interface GoodsListDto extends BaseDto {
    goodses: Goods[];
}
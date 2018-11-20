import {BaseDto} from './basedto'
import {Item} from '../model';

export interface ItemListDto extends BaseDto {
    items: Item[];
}
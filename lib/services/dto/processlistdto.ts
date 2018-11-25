import {BaseDto} from './basedto'
import {Material} from '../model';

export interface ProcessListDto extends BaseDto {
    materials: Material[];
}
import {BaseDto} from './basedto'
import {Process} from '../model';

export interface ProcessListDto extends BaseDto {
    processes: Process[];
}
import {BaseSdo} from './basesdo';

export interface ProcessListSdo extends BaseSdo{
    processes: any[]|null;
}
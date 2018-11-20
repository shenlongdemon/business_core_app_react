import {IObject} from './iobject';
import {Worker} from './worker';

export interface Task extends IObject {
    name: string;
    description: string;
    imageUrl: string;
    code: string;
    workers: Worker[];
    materialId: string;
    materialOwnerId: string;
}
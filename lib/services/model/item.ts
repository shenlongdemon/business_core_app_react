import {IObject} from './iobject'
import {ItemHistory} from './itemhistory';
export class Item extends IObject {
    constructor() {
        super();
    }
    
    getHistories = (): ItemHistory[] => {
        const histories: ItemHistory[] = [];
        
        return histories;
    }
    
}
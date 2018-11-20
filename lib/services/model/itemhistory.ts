import {IObject} from './iobject';
import {Coord} from './coord';
import {Activity} from './activity';

export interface ItemHistory extends IObject {
    location: Coord;
    name: string;
    code: string;
    time: number
    imageUrl: string | number;
    activity: Activity | null;
}
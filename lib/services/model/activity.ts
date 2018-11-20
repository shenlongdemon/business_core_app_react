import {IObject} from './iobject'
import {User} from './user';
import {Coord} from './coord';

export interface Activity extends IObject{
    title: string;
    description: string;
    time: number;
    images: string[];
    files: string[] | null;
    logoTaskUrl: string;
    worker: User;
    coord: Coord;
}
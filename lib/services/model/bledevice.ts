import {IObject} from './iobject';
import {BLECoord} from './blecoord'

export interface BLEDevice extends IObject{
    name: string;
    localName: string;
    proximityUUID: string;
    ownerId: string;
    coord: BLECoord;
}
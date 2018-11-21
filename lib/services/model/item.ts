import {IObject} from './iobject';
import {Activity} from './activity';
import {Category} from './category';
import {Section} from './section';
import {UserInfo} from './userinfo';
import {Material} from './material';
import {BLEDevice} from './bledevice';
import {Bluetooth} from './bluetooth';
import {BLEPosition} from './bleposition';

export interface Item extends IObject {
    name: string;
    price: string;
    description: string;
    category: Category;
    imageUrl: string;
    code: string;
    sellCode: string;
    buyerCode: string;
    bluetoothCode: string;
    section: Section;
    owner: UserInfo
    buyer: UserInfo | null;
    iBeacon: BLEDevice | null;
    location: BLEPosition;
    bluetooth: Bluetooth | null;
    view3d: string;
    material: Material | null;
    time: number;
    maintains: [Activity[];
}
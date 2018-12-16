import {IObject} from "./iobject";
import {Position} from "./position";

export interface Bluetooth extends IObject{
  mac: string;
  proximityUUID: string;
  name: string;
  position: Position;
}

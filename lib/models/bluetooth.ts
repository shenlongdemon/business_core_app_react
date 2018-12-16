import {IObject} from "./iobject";

export interface Bluetooth extends IObject{
  mac: string;
  proximityUUID: string;
  name: string;
  position: Position;
}

import { IObject } from "./iobject";
import { Position } from "./position";

export interface Bluetooth extends IObject {
  name: string;
  localName: string;
  position: Position
}

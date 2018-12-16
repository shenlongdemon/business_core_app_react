import { IObject } from "./iobject";
import { Activity } from "./activity";
import { Position } from "./position";

export interface ItemHistory extends IObject {
  /**
   * location: using for making location of marker on map
   */
  location: Position;
  name: string;
  code: string;
  time: number;
  imageUrl: string | number;
  activity: Activity | null;
}

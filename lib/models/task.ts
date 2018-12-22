import { IObject } from "./iobject";
import { DynProperty } from "./dynproperty";

export interface Task extends IObject {
  code: string;
  name: string;
  workers: Worker[];
  materialId: string;
  materialOwnerId: string;
  properties: DynProperty[];
}

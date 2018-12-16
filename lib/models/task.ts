import { IObject } from "./iobject";
import { Worker } from "./worker";
import { DynProperty } from "./dynproperty";

export interface Task extends IObject {
  code: string;
  name: string;
  workers: Worker[];
  materialId: string;
  materialOwnerId: string;
  properties: DynProperty[];
}

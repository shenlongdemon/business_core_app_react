import { IObject } from "./iobject";
import { Task } from "./task";

export interface Material extends IObject {
  name: string;
  ownerId: string;
  description: string;
  code: string;
  bluetooth: string;
  tasks: Task[];
  imageUrl: string;
  createdAt: number;
  updatedAt: number;
}

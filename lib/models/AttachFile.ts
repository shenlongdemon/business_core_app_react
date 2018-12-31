import {IObject} from "./iobject";

export interface AttachFile extends IObject {
  description: string;
  link: string;
  time: number;
}
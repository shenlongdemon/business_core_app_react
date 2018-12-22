import {IObject} from "./iobject";
import {Process} from './process';
import {UserInfo} from './userinfo';
import {Bluetooth} from './bluetooth';

export interface Material extends IObject {
  owner: UserInfo;
  name: string;
  description: string;
  code: string;
  bluetooth: Bluetooth | null;
  imageUrl: string;
  createdAt: number;
  updatedAt: number;
  processes: Process[];
}

///<reference path="../infrastructure/services/businessservice.ts"/>

import {
  ItemListDto,
  ProcessListDto,
  ProcessDetailDto,
  ObjectOfQRCodeDto
} from "./dto";
import { Item, ItemHistory, Position, User } from "./model";

export interface IBusinessService {
  saveCurrentPosition(position: Position): any;

  toTimeString(time: number): string;

  toDateString(time: number): string;

  getItemHistories(item: Item): Promise<ItemHistory[]>;

  getItems(): Promise<ItemListDto>;

  getProcesses(): Promise<ProcessListDto>;

  getObjectByQRCode(code: string): Promise<ObjectOfQRCodeDto>;

  getLinkImage(relative: string): string;

  getCurrentPosition(): Promise<Position>;

  getUser(): Promise<User>;
}

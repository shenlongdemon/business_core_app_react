///<reference path="../infrastructure/services/businessservice.ts"/>

import {
  ItemListDto,
  ObjectOfQRCodeDto
} from "./dto";
import { Item, ItemHistory, Position, User } from "../models";

export interface IBusinessService {
  saveCurrentPosition(position: Position): any;

  toTimeString(time: number): string;

  toDateString(time: number): string;

  getItemHistories(item: Item): Promise<ItemHistory[]>;

  getItems(): Promise<ItemListDto>;


  getObjectByQRCode(code: string): Promise<ObjectOfQRCodeDto>;

  getLinkImage(relative: string): string;

  getCurrentPosition(): Promise<Position>;

  getUser(): Promise<User>;
}

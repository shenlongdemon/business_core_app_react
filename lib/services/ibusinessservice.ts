///<reference path="../infrastructure/services/businessservice.ts"/>

import {
  ItemListDto,
  ObjectOfQRCodeDto
} from "./dto";
import {Item, ItemHistory, Position, User} from "../models";
import {CONSTANTS} from "business_core_app_react";

export interface IBusinessService {
  saveCurrentPosition(position: Position): any;
  
  toTimeString(time: number): string;
  
  toDateString(time: number): string;
  
  getItemHistories(item: Item): Promise<ItemHistory[]>;
  
  getItems(): Promise<ItemListDto>;
  
  getObjectByQRCode(code: string): Promise<ObjectOfQRCodeDto>;
  
  getLink(relative: string): string;
  
  getCurrentPosition(): Promise<Position>;
  
  getUser(): Promise<User>;
  
  toDateString(time: number): string;
  
  toTimeString(time: number): string;
}

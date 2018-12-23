///<reference path="../infrastructure/services/businessservice.ts"/>

import {
  ItemListDto,
  ObjectByCodeDto
} from "./dto";
import {Position, User} from "../models";

export interface IBusinessService {
  saveCurrentPosition(position: Position): any;
  
  toTimeString(time: number): string;
  
  toDateString(time: number): string;
  
  getItems(): Promise<ItemListDto>;
  
  getObjectByCode(code: string): Promise<ObjectByCodeDto>;
  
  getLink(relative: string): string;
  
  getCurrentPosition(): Promise<Position>;
  
  getUser(): Promise<User>;
  
  toDateString(time: number): string;
  
  toTimeString(time: number): string;
}

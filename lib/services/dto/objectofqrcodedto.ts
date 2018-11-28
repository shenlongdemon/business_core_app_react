import { BaseDto } from "./basedto";
import { ScanQRItem } from "../model";

export interface ObjectOfQRCodeDto extends BaseDto {
  object?: ScanQRItem | null;
}

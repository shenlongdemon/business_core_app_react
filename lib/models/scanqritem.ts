import { ScanQRItemType } from "../services/common";

export interface ScanQRItem {
  type: ScanQRItemType;
  item: any | null;
}

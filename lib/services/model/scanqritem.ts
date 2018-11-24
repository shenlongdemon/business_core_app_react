import {ScanQRItemType} from '../common';

export interface ScanQRItem {
  type?: ScanQRItemType;
  item?: any | null;
}
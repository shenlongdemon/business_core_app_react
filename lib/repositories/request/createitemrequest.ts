import {Bluetooth, UserInfo} from '../../models';

export interface CreateItemRequest {
  name: string;
  price: number;
  description: string;
  category: any;
  imageUrl: string;
  owner: any;
  bluetooth: any | null;
  material: any | null;
}

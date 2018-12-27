import {Bluetooth} from '../../models';

export interface CreateMaterialRequest {
  owner: any;
  name: string;
  description: string;
  imageUrl: string;
  bluetooth: Bluetooth | null;
}

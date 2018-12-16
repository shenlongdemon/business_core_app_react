import {Bluetooth, UserInfo} from '../../models';

export interface CreateMaterialRequest {
  ownerId: string;
  name: string;
  description: string;
  imageUrl: string;
  bluetooth: Bluetooth | null;
  userInfo: UserInfo;
}

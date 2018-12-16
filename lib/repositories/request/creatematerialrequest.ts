import {Bluetooth, UserInfo} from '../../models';

export interface CreateMaterialRequest {
  ownerId: string;
  name: string;
  description: string;
  imageName: string;
  bluetooth: Bluetooth | null;
  userInfo: UserInfo;
}

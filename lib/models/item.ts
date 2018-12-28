import { IObject } from "./iobject";
import { Activity } from "./activity";
import { Category } from "./category";
import { Transaction } from "./transaction";
import { UserInfo } from "./userinfo";
import { Material } from "./material";
import { Bluetooth } from "./bluetooth";

export interface Item extends IObject {
  name: string;
  price: string;
  description: string;
  category: Category;
  imageUrl: string;
  code: string;
  sellCode: string;
  transactions: Transaction[];
  owner: UserInfo;
  buyer: UserInfo | null;
  bluetooth: Bluetooth | null;
  view3d: string;
  material: Material | null;
  time: number;
  maintains: Activity[];
}

import { BaseDto } from "./basedto";
import { Item } from "../../models";

export interface ItemListDto extends BaseDto {
  items: Item[];
}

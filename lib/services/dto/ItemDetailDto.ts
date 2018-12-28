import { BaseDto } from "./basedto";
import {Item} from "../../models";

export interface ItemDetailDto extends BaseDto {
  item: Item | null;
}

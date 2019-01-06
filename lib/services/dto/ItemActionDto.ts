import { BaseDto } from "./basedto";
import {Item} from "../../models";

export interface ItemActionDto extends BaseDto {
  item: Item | null;
}

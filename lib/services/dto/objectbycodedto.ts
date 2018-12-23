import { BaseDto } from "./basedto";
import {ObjectByCode} from "../../models";

export interface ObjectByCodeDto extends BaseDto {
  item: ObjectByCode | null;
}

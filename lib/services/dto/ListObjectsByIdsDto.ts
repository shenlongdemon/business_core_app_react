import { BaseDto } from "./basedto";
import {ObjectByCode} from "../../models";

export interface ListObjectsByIdsDto extends BaseDto {
  items: ObjectByCode[];
}

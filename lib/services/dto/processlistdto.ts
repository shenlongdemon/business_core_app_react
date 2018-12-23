import { BaseDto } from "./basedto";
import { Material } from "../../models";

export interface ProcessListDto extends BaseDto {
  materials: Material[];
}

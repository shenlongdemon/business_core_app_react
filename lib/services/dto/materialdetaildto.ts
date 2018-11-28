import { BaseDto } from "./basedto";
import { Material } from "../model/material";
export interface MaterialDetailDto extends BaseDto {
  material?: Material | null;
}

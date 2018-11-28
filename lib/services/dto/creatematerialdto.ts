import { BaseDto } from "./basedto";
import { Material } from "../model/material";
export interface CreateMaterialDto extends BaseDto {
  material?: Material | null;
}

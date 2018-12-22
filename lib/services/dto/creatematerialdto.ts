import { BaseDto } from "./basedto";
import { Material } from "../../models";
export interface CreateMaterialDto extends BaseDto {
  material?: Material | null;
}

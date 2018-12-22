import { BaseDto } from "./basedto";
import { Material } from "../../models";
export interface MaterialDetailDto extends BaseDto {
  material?: Material | null;
}

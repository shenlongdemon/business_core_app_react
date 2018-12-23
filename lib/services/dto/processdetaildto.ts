import { BaseDto } from "./basedto";
import { Process } from "../../models";
export interface ProcessDetailDto extends BaseDto {
  process: Process | null;
}

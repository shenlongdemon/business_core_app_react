import { BaseDto } from "./basedto";
import { Process } from "../model/process";
export interface ProcessDetailDto extends BaseDto {
  process: Process | null;
}

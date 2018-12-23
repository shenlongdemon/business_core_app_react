import { BaseDto } from "./basedto";
import { Process } from "../../models";

export interface ProcessDto extends BaseDto{
  process: Process | null;
}
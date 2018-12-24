import { BaseDto } from "./basedto";
import {Activity} from "../../models";

export interface ActivitiesListDto extends BaseDto{
  activities: Activity[];
}
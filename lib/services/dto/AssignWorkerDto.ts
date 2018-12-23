import { BaseDto } from "./basedto";
import {User} from "../../models";

export interface AssignWorkerDto extends BaseDto{
  user: User | null;
}
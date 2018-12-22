import {ProcessStep} from "./processstep";
import {UserInfo} from "./userinfo";
import {Activity} from "./activity";

export enum ProcessStatus {
  TODO = 0,
  IN_PROGRESS = 1,
  DONE = 2
};

export interface Process extends ProcessStep {
  code: string;
  status: ProcessStatus,
  workers: UserInfo[];
  activities: Activity[];
  updateAt: number;
}


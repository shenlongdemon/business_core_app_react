import { ObjectType } from "../services/common";

export interface ObjectByCode {
  type: ObjectType;
  item: any | null;
}

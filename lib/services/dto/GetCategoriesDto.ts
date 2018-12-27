import { BaseDto } from "./basedto";
import {Category} from "../../models";

export interface GetCategoriesDto extends BaseDto {
  categories: Category[];
}

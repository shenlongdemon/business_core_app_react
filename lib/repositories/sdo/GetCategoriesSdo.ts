import { BaseSdo } from "./basesdo";

export interface GetCategoriesSdo extends BaseSdo{
  categories: any[] | null;
}
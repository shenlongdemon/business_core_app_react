import { BaseSdo } from "./basesdo";

export interface ListObjectsByIdsSdo extends BaseSdo{
  items: any[] | null;
}
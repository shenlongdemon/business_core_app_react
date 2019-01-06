import { Container, interfaces } from "inversify";
import "reflect-metadata";
import { PUBLIC_TYPES, PRIVATE_TYPES } from "./identifiers";
import {
  ITestService,
  IBusinessService,
  IAuthService,
  IProcessService,
  IItemService
} from "../services";
import {
  TestService,
  BusinessService,
  AuthService,
  ProcessService,
  ItemService
} from "./services";

import { IAuthRepo, IBusinessRepo, IProcessRepo , IItemRepo} from "../repositories";
import { AuthRepo, BusinessRepo, ProcessRepo, ItemRepo } from "./repositpries";

import { IWebApi } from "../webapi/iwebapi";
import { AxiosWebApi } from "./webapi/axioswebapi";

let builder: Container = new Container();

builder.bind<ITestService>(PUBLIC_TYPES.ITestService).to(TestService);
builder.bind<IAuthService>(PUBLIC_TYPES.IAuthService).to(AuthService);
builder
  .bind<IBusinessService>(PUBLIC_TYPES.IBusinessService)
  .to(BusinessService);
builder.bind<IProcessService>(PUBLIC_TYPES.IProcessService).to(ProcessService);
builder.bind<IItemService>(PUBLIC_TYPES.IItemService).to(ItemService);

builder.bind<IAuthRepo>(PRIVATE_TYPES.IAuthRepo).to(AuthRepo);
builder.bind<IBusinessRepo>(PRIVATE_TYPES.IBusinessRepo).to(BusinessRepo);
builder.bind<IProcessRepo>(PRIVATE_TYPES.IProcessRepo).to(ProcessRepo);
builder.bind<ItemRepo>(PRIVATE_TYPES.IItemRepo).to(ItemRepo);

builder
  .bind<IWebApi>(PUBLIC_TYPES.IWebApi)
  .to(AxiosWebApi)
  .inSingletonScope();

export default builder;

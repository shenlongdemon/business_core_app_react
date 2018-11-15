import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { PUBLIC_TYPES, PRIVATE_TYPES } from './identifiers';
import { ITestService, IBusinessService, IAuthService } from '../services';

import { TestService, BusinessService, AuthService } from './services';

import { IAuthRepo, IBusinessRepo } from '../repositories';

import { AuthRepo, BusinessRepo } from './repositpries';

import { IWebApi } from '../webapi/iwebapi';
import { AxiosWebApi } from './webapi/axioswebapi';



let builder: Container = new Container();

builder.bind<ITestService>(PUBLIC_TYPES.ITestService).to(TestService);
builder.bind<IAuthService>(PUBLIC_TYPES.IAuthService).to(AuthService);
builder.bind<IBusinessService>(PUBLIC_TYPES.IBusinessService).to(BusinessService);

builder.bind<IAuthRepo>(PRIVATE_TYPES.IAuthRepo).to(AuthRepo);
builder.bind<IBusinessRepo>(PRIVATE_TYPES.IBusinessRepo).to(BusinessRepo);

builder.bind<IWebApi>(PUBLIC_TYPES.IWebApi).to(AxiosWebApi).inSingletonScope();



export default builder;
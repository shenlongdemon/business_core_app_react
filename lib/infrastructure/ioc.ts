import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { PUBLIC_TYPES, PRIVATE_TYPES } from './identifiers';
import { ITestService } from '../services/itestservice';
import { IAuthService } from '../services/iauthservice';
import { TestService } from './services/testservice';
import { AuthService } from './services/authservice';
import { IAuthRepo } from '../repositories/iauthrepo';
import { AuthRepo } from './repositpries/authrepo';
import { IWebApi } from '../webapi/iwebapi';
import { AxiosWebApi } from './webapi/axioswebapi';



let builder: Container = new Container();

builder.bind<ITestService>(PUBLIC_TYPES.ITestService).to(TestService);
builder.bind<IAuthService>(PUBLIC_TYPES.IAuthService).to(AuthService);
builder.bind<IAuthRepo>(PRIVATE_TYPES.IAuthRepo).to(AuthRepo);

builder.bind<IWebApi>(PUBLIC_TYPES.IWebApi).to(AxiosWebApi).inSingletonScope();

export default builder;
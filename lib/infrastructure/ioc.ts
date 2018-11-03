import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './identifiers';
import { ITestService } from '../services/itestservice';
import { IAuthService } from '../services/iauthservice';
import { TestService } from './services/testservice';
import { AuthService } from './services/authservice';
import { IAuthRepo } from '../repositories/iauthrepo';
import { AuthRepo } from './repositpries/authrepo';
import { IWebApi } from '../webapi/iwebapi';
import { TRCWebApi } from './webapi/trcwebapi';



let builder: Container = new Container();

builder.bind<ITestService>(TYPES.ITestService).to(TestService);
builder.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
builder.bind<IAuthRepo>(TYPES.IAuthRepo).to(AuthRepo);

builder.bind<IWebApi>(TYPES.IWebApi).to(TRCWebApi);

export default builder;
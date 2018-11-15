import {IBusinessService} from "business_core_app_react";

const PUBLIC_TYPES = {
    ITestService : ('ITestService'),
    IAuthService : ('IAuthService'),
    IWebApi : ('IWebApi'),
    IStore : ('IStore'),
    IBusinessService : ('IBusinessService'),
};
const PRIVATE_TYPES = {
    IAuthRepo : ('IAuthRepo'),
    IBusinessRepo : ('IBusinessRepo'),
};

export {PUBLIC_TYPES, PRIVATE_TYPES};
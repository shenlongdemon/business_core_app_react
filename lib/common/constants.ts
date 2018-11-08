import { ENV } from "business_core_app_react/lib/config";

const STORAGE_KEYS = {
    USER: 'user'
};

const CONSTANTS = {
    STR_EMPTY : '',
    
};

const HTTPC_CODE = {
    OK: 200,
    NOT_RECEIVED: -1
}

const API_STATUS_CODE = {
    OK: 0,
    EXCEPTION: -1
}

const API = {
    LOGIN: ENV.HOST + '/api/manifactory/login'
}

export {STORAGE_KEYS, CONSTANTS, HTTPC_CODE, API_STATUS_CODE, API};
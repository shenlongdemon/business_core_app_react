import {ENV} from "business_core_app_react/lib/config";

const STORAGE_KEYS = {
  USER: '@manufacotry:user',
  CURRENT_POSITION : '@manufacotry:current_position'
};

const CONSTANTS = {
  STR_EMPTY: '',
  DATE_FORMAT: 'YYYY-MM-DD',
  TIME_FORMAT: 'HH : MM'
};

const HTTPC_CODE = {
  OK: 200,
  NOT_RECEIVED: -1
}

const API_STATUS_CODE = {
  OK: 1,
  EXCEPTION: -1
}

export {STORAGE_KEYS, CONSTANTS, HTTPC_CODE, API_STATUS_CODE};
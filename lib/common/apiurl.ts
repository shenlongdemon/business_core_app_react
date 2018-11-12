import {ENV} from '../config';

const API = {
    LOGIN: (): string => {return ENV.HOST + '/api/manifactory/login'}
}
export {API};
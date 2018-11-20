import {ENV} from '../config';

const API = {
    LOGIN: (): string => {
        return ENV.HOST + '/api/manifactory/login'
    },
    GET_ITEMS: (userId: string): string => {
        return ENV.HOST + '/api/sellrecognizer/getItemsByOwnerId?ownerId=' + userId + '&pageNum=1&pageSize=10000"';
    },
    GET_PROCESSES: (userId: string): string => {
        return `${ENV.HOST}/api/manifactory/getMaterialsByOwnerId?id=${userId}&pageSize=10000&pageNum=1`;
    },
}
export {API};
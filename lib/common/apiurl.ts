import {ENV} from '../config';

const API = {
    LOGIN: (): string => {
        return ENV.HOST + '/api/manifactory/login'
    },
    GET_GOODSES: (userId: string): string => {
        return ENV.HOST + '/api/sellrecognizer/getItemsByOwnerId?ownerId=' + userId + '&pageNum=1&pageSize=10000"'
    },
}
export {API};
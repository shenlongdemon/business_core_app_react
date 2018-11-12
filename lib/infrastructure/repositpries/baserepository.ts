import {injectable} from "inversify";
import {ApiResult} from '../../webapi';
import { BaseSdo } from '../../repositories';
import {API, API_STATUS_CODE, CONSTANTS} from '../../common';

@injectable()
export class BaseRepository {
    constructor() {}

    protected transform = (apiResult: ApiResult): BaseSdo => {
        let baseSdo: BaseSdo = {
            isSuccess : apiResult.Status === API_STATUS_CODE.OK,
            message: apiResult.Message,
            __debug: apiResult
        };

        return baseSdo;
    }
}
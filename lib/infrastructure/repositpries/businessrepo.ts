import {BaseRepository} from './baserepository';
import {IBusinessRepo, GoodsListSdo, LoginSdo} from '../../repositories';
import {inject, injectable} from "inversify";
import {IWebApi, ApiResult} from '../../webapi';
import {PUBLIC_TYPES, PRIVATE_TYPES} from '../identifiers';
import {STORAGE_KEYS, CONSTANTS, API} from '../../common';


@injectable()
export class BusinessRepo extends BaseRepository implements IBusinessRepo{

    @inject(PUBLIC_TYPES.IWebApi) private api!: IWebApi;

    getGoodses = async (userId: string): Promise<GoodsListSdo> => {
        var url: string =
        const res: ApiResult = await this.api.get(API.GET_GOODSES(userId));
        let gdodsListSdo: GoodsListSdo = {
            ...this.transform(res),
            goodses: res.Data
        };
        return gdodsListSdo;
    }

}
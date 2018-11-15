import {IBusinessService, Goods, GoodsListDto, User} from '../../services'
import {inject, injectable} from 'inversify';
import {PRIVATE_TYPES, PUBLIC_TYPES} from "../../infrastructure";
import {IBusinessRepo, GoodsListSdo, IStore} from '../../repositories';
import {BaseService} from './baseservice';
import {CONSTANTS} from '../../common'

@injectable()
export class BusinessService extends BaseService implements IBusinessService {

    @inject(PRIVATE_TYPES.IBusinessRepo) private businessRepo!: IBusinessRepo;
    @inject(PUBLIC_TYPES.IStore) private store!: IStore;

    getGoods = async (): Promise<GoodsListDto> => {
        const userId: string = await this.getUserId();
        const res: GoodsListSdo = await this.businessRepo.getGoodses(userId);
        var goodses: Goods[] = [];
        if (res.isSuccess && res.goodses) {
            goodses = res.goodses.map((g: any) => {
                const goods: Goods = this.mappingGoods(g);
                return goods;
            }) || [];
        }

        let goodsListDto: GoodsListDto = {
            ...this.transform(res),
            goodses: goodses
        };

        return goodsListDto;
    }

    private getUserId = async (): Promise<string> => {
        const user: User | null = await this.store.getUser();
        var userId: string = CONSTANTS.STR_EMPTY;
        if (user) {
            userId = user.id;
        }
        return userId;
    }

}
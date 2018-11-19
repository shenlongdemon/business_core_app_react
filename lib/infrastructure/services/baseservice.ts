import {BaseSdo, LoginSdo} from '../../repositories'
import {BaseDto, User, Goods, Process} from '../../services'
import {injectable} from "inversify";

@injectable()
export class BaseService {
    constructor() {
    }

    protected populate = (sdo: BaseSdo): BaseDto => {
        const dto: BaseDto = {
            isSuccess: sdo.isSuccess,
            message: sdo.message
        };

        return dto;
    }

    protected mappingGoodses = (data: any[]): Goods[] => {
        const goodses: Goods[] = [];
        const goodsesData: (Goods | null)[] = data.map((g: any) => {
            const goods: Goods| null = this.mappingGoods(g);
            return goods;
        });
    
        goodsesData.map((goods: Goods| null) => {
            if (goods) {
                goodses.push(goods);
            }
        });
        
        return goodses;
    }
    
    protected mappingProcesses = (data: any[]): Process[] => {
        const processes: Process[] = [];
        const processesData: (Process | null)[] = data.map((g: any) => {
            const process: Process| null = this.mappingProcess(g);
            return process;
        });
    
        processesData.map((process: Process| null) => {
            if (process) {
                processes.push(process);
            }
        });
        
        return processes;
    }
    
    protected mappingProcess = (data: any): Process | null => {
        const process: Process | null = this.mappingByJSON(data);
        return process;
    }
    
    protected mappingUser = (data: any): User | null => {
        const user: User | null = this.mappingByJSON(data);
        return user;
    }

    protected mappingGoods = (data: any): Goods | null => {
        const goods: Goods | null = this.mappingByJSON(data);
        return goods;
    }

    private mappingByJSON = <T>(data: any): T | null => {
        try {
            const dto: T = <T>JSON.parse(JSON.stringify(data));
            return dto;
        }
        catch (e) {
            return null;
        }
    }
}
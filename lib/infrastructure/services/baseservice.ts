import {BaseSdo, LoginSdo} from '../../repositories'
import {BaseDto, User, Item, Process} from '../../services'
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

    protected mappingItems = (data: any[]): Item[] => {
        const items: Item[] = [];
        const itemData: (Item | null)[] = data.map((g: any) => {
            const item: Item| null = this.mappingItem(g);
            return item;
        });
    
        itemData.map((item: Item| null) => {
            if (item) {
                items.push(item);
            }
        });
        
        return items;
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

    protected mappingItem = (data: any): Item | null => {
        const item: Item | null = this.mappingByJSON(data);
        return item;
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
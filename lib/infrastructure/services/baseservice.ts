import {BaseSdo} from "../../repositories";
import {BaseDto,} from "../../services";
import {
  Item,
  Material,
  Process,
  User,
  Weather
} from '../../models';
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
  };
  
  protected mappingWeather = (data: any): Weather  => {
    
    try {
      const weather: Weather = {
        temp: data.main.temp,
        country: data.sys.country,
      };
      return weather;
    } catch (ex) {
      const str: string =
        '{\n    "coord": {\n        "lon": 108.2,\n        "lat": 16.07\n    },\n    "weather": [\n        {\n            "id": 801,\n            "main": "Clouds",\n            "description": "few clouds",\n            "icon": "02d"\n        }\n    ],\n    "base": "stations",\n    "main": {\n        "temp": 34.37,\n        "pressure": 1007,\n        "humidity": 66,\n        "temp_min": 32,\n        "temp_max": 36\n    },\n    "visibility": 8000,\n    "wind": {\n        "speed": 5.1,\n        "deg": 110\n    },\n    "clouds": {\n        "all": 20\n    },\n    "dt": 1526367600,\n    "sys": {\n        "type": 1,\n        "id": 7978,\n        "message": 0.0112,\n        "country": "VN",\n        "sunrise": 1526336236,\n        "sunset": 1526382600\n    },\n    "id": 1583992,\n    "name": "Turan",\n    "cod": 200\n}';
      const weather = JSON.parse(str) as Weather;
      return weather;
    }
  }
  
  protected mappingItems = (data: any[]): Item[] => {
    const items: Item[] = [];
    const itemData: (Item | null)[] = data.map((g: any) => {
      const item: Item | null = this.mappingItem(g);
      return item;
    });
    
    itemData.map((item: Item | null) => {
      if (item) {
        items.push(item);
      }
    });
    
    return items;
  };
  
  protected mappingProcesses = (data: any[]): Process[] => {
    const processes: Process[] = [];
    const processesData: (Process | null)[] = data.map((g: any) => {
      const process: Process | null = this.mappingProcess(g);
      return process;
    });
    
    processesData.map((process: Process | null) => {
      if (process) {
        processes.push(process);
      }
    });
    
    return processes;
  };
  
  protected mappingList<T>(data: any): T[] {
    const ts: T[] = [];
    const tList: (T | null)[] = data.map((g: any) => {
      const t: T | null = this.mappingByJSON(g);
      return t;
    });
    
    tList.map((t: T | null) => {
      if (t) {
        ts.push(t);
      }
    });
    
    return ts;
  }
  
  protected mappingMaterial(data: any): Material | null {
    const material: Material | null = this.mappingByJSON(data);
    
    return material;
  }
  protected mappingObject = <T extends {}> (data: any) : T | null => {
    const t: T | null = this.mappingByJSON(data);
    return t;
  }
  protected mappingProcess = (data: any): Process | null => {
    const process: Process | null = this.mappingByJSON(data);
    return process;
  };
  
  protected mappingUser = (data: any): User | null => {
    const user: User | null = this.mappingByJSON(data);
    return user;
  };
  
  protected mappingItem = (data: any): Item | null => {
    const item: Item | null = this.mappingByJSON(data);
    return item;
  };
  
  private mappingByJSON = <T>(data: any): T | null => {
    try {
      const dto: T = <T>JSON.parse(JSON.stringify(data));
      return dto;
    } catch (e) {
      return null;
    }
  };
}

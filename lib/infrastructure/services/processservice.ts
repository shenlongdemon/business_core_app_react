import {BaseDto, CreateMaterialDto, IProcessService, MaterialDetailDto, ProcessListDto} from "../../services";
import {
  Bluetooth,
  DynProperty,
  DynPropertyType,
  Material,
  Position,
  User,
  UserInfo,
  Weather
} from "../../models";
import {BaseService} from "./baseservice";
import {inject, injectable} from "inversify";
import {PRIVATE_TYPES, PUBLIC_TYPES} from "../identifiers";
import {
  CreateMaterialSdo,
  IBusinessRepo,
  IProcessRepo,
  IStore,
  MaterialDetailSdo,
  ProcessListSdo,
  WeatherDataSdo,
  BaseSdo
} from "../../repositories";
import {CONSTANTS} from "../../common";

// @ts-ignore
const uuidv4 = require("uuid/v4");

@injectable()
export class ProcessService extends BaseService implements IProcessService {
  @inject(PRIVATE_TYPES.IProcessRepo) private processRepo!: IProcessRepo;
  @inject(PRIVATE_TYPES.IBusinessRepo) private businessRepo!: IBusinessRepo;
  @inject(PUBLIC_TYPES.IStore) private store!: IStore;
  
  getMaterialDetail = async (id: string): Promise<MaterialDetailDto> => {
   
    const res: MaterialDetailSdo = await this.processRepo.getMaterialDetail(id);
    let material: Material | null = null;
    if (res.isSuccess && res.material) {
      material = this.mappingMaterial(res.material);
    }
    
    const dto: MaterialDetailDto = {
      ...this.populate(res),
      material: material
    };
    
    return dto;
  };
  
  
  async getProcesses(): Promise<ProcessListDto> {
    console.log('BEGIN getProcesses at ' + Date.now());
    
    const user: User | null = await this.store.getUser();
    const res: ProcessListSdo = await this.processRepo.getProcesses(user!.id);
    let materials: Material[] = [];
    if (res.isSuccess && res.materials) {
      materials = this.mappingList<Material>(res.materials);
    }
    
    const dto: ProcessListDto = {
      ...this.populate(res),
      materials: materials
    };
    console.log('END getProcesses at ' + Date.now());
    
    return dto;
  }
  
  
  getUserInfo = async (): Promise<UserInfo> => {
    console.log('BEGIN getUserInfo at ' + Date.now());
    const position: Position | null = await this.store.getCurrentPosition();
    console.log('BEGIN getUserInfo at ' + Date.now() + ' curent position ' + position);
    const weather: Weather = await this.getWeather(
      position!.latitude,
      position!.longitude
    );
    console.log('BEGIN getUserInfo at ' + Date.now() + ' ưeather ' + weather);
  
    const user: User | null = await this.store.getUser();
    
    const userInfo: UserInfo = {
      ...user!,
      code: CONSTANTS.STR_EMPTY,
      position: position!,
      weather: weather,
      time: Date.now(),
      index: 0
    };
    console.log('BEGIN getUserInfo at ' + Date.now());
    
    return userInfo;
  };
  
  createMaterial = async (name: string,
                          description: string,
                          imageUri: string,
                          bluetooth: Bluetooth | null): Promise<CreateMaterialDto> => {
    console.log('BEGIN createMaterial at ' + Date.now());
    
    const userInfo: UserInfo = await this.getUserInfo();
    let imageName: string = CONSTANTS.STR_EMPTY;
    if (imageUri !== CONSTANTS.STR_EMPTY) {
      imageName = this.genImageName();
      await this.businessRepo.uploadImage(imageName, imageUri);
    }
    
    
    const res: CreateMaterialSdo = await this.processRepo.createMaterial(name, description, imageName, bluetooth, userInfo);
    
    let material: Material | null = null;
    if (res.isSuccess && res.material) {
      material = this.mappingMaterial(res.material);
    }
    const dto: CreateMaterialDto = {
      ...this.populate(res),
      material: material
    };
    console.log('END createMaterial at ' + Date.now());
    return dto;
  };
  
  private getWeather = async (latitude: number, longitude: number): Promise<Weather> => {
    console.log('BEGIN getWeather at ' + Date.now());
    
    const res: WeatherDataSdo = await this.businessRepo.getWeather(latitude, longitude);
    const weather: Weather = this.mappingWeather(res.weather);
    console.log('END getWeather at ' + Date.now());
    
    return weather;
  };
  
  private genImageName = (): string => {
    const imageName: string = `${uuidv4()
    .toString()
    .replace(/-/g, "")}.jpg`;
    return imageName;
  };
  private genPDFName = (): string => {
    const imageName: string = `${uuidv4()
    .toString()
    .replace(/-/g, "")}.pdf`;
    return imageName;
  };
  
  updateProcessDynProperties = async (materialId: string, processId: string, properties: DynProperty[]): Promise<BaseDto> => {
    const fileNames: string[] = [];
    const fileTypes: string[] = [];
    const fileUris: string[] = [];
  
    properties.forEach((p: DynProperty): void => {
      if (p.type === DynPropertyType.IMAGE && p.value.startsWith('content')) {
        const name: string = this.genImageName();
        fileUris.push(p.value);
        fileNames.push(name);
        fileTypes.push('image/png');
        p.value = name;
      }
      else if (p.type === DynPropertyType.FILE && p.value.startsWith('content')) {
        const name: string = this.genPDFName();
        fileUris.push(p.value);
        fileNames.push(name);
        fileTypes.push('application/pdf');
        p.value = name;
      }
    });
    
    
    if (fileUris.length > 0) {
      await this.businessRepo.uploadFiles(fileUris, fileNames, fileTypes);
    }
    
    const sdo: BaseSdo = await this.processRepo.updateProcessDynProperties(materialId, processId, properties);
    return {...this.populate(sdo)};
  }
}

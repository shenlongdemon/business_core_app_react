import {
  IProcessService,
  Material,
  MaterialDetailDto,
  UserInfo,
  Position,
  Weather,
  User,
  CreateMaterialDto
} from "../../services";
import {BaseService} from "./baseservice";
import {inject, injectable} from "inversify";
import {PRIVATE_TYPES, PUBLIC_TYPES} from "../identifiers";
import {IAuthRepo} from "../../repositories/iauthrepo";
import {
  IStore,
  MaterialDetailSdo,
  IProcessRepo,
  IBusinessRepo,
  WeatherDataSdo,
  CreateMaterialSdo
} from "../../repositories";
import {CONSTANTS} from "../../common";

// @ts-ignore
const uuidv4 = require("uuid/v4");

@injectable()
export class ProcessService extends BaseService implements IProcessService {
  @inject(PRIVATE_TYPES.IProcessRepo) private processRepo!: IProcessRepo;
  @inject(PRIVATE_TYPES.IBusinessRepo) private ibusinessRepo!: IBusinessRepo;
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
  
  getUserInfo = async (): Promise<UserInfo> => {
    const position: Position | null = await this.store.getCurrentPosition();
    const weather: Weather = await this.getWeather(
      position!.coord.latitude,
      position!.coord.longitude
    );
    const user: User | null = await this.store.getUser();
    
    const userInfo: UserInfo = {
      ...user!,
      code: CONSTANTS.STR_EMPTY,
      position: position!,
      weather: weather,
      time: Date.now(),
      index: 0
    };
    
    return userInfo;
  };
  
  createMaterial = async (name: string, description: string, imageData: any | null, bleDeviceId: string): Promise<CreateMaterialDto> => {
    debugger;
    const imageName: string = this.genImageName();
    
    var a = 10;
    
    const userInfo: UserInfo = await this.getUserInfo();
    
    //const res: CreateMaterialSdo = await this.processRepo.createMaterial(userInfo.id, name, description, imageName, bleDeviceId, userInfo);
    const res: CreateMaterialSdo = {isSuccess: true, message: ""};
    
    let material: Material | null = null;
    if (res.isSuccess && res.material) {
      material = this.mappingMaterial(res.material);
      if (material) {
        // await this.processRepo.uploadMaterialImage(
        //   material.id,
        //   imageName,
        //   image
        // );
      }
    }
    const materialId: string = uuidv4();
    await this.processRepo.uploadMaterialImage(materialId, imageData, `${materialId.toString().replace(/-/g, "")}.jpg`);
    
    const dto: CreateMaterialDto = {
      ...this.populate(res),
      material: material
    };
    debugger
    return dto;
  };
  
  private getWeather = async (latitude: number, longitude: number): Promise<Weather> => {
    const res: WeatherDataSdo = await this.ibusinessRepo.getWeather(latitude, longitude);
    const weather: Weather = this.mappingWeather(res.weather);
    
    return weather;
  };
  
  private genImageName = (): string => {
    const imageName: string = `${uuidv4()
    .toString()
    .replace(/-/g, "")}.jpg`;
    return imageName;
  };
}

import {
  IProcessService,
  Material,
  MaterialDetailDto,
  UserInfo,
  Position,
  Weather,
  User,
  CreateMaterialDto
} from '../../services';
import {BaseService} from './baseservice';
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

// @ts-ignore
const uuidv4 = require('uuid/v4')

@injectable()
export class ProcessService extends BaseService implements IProcessService {
  
  @inject(PRIVATE_TYPES.IProcessRepo) private processRepo!: IProcessRepo;
  @inject(PRIVATE_TYPES.IBusinessRepo) private ibusinessRepo!: IBusinessRepo;
  @inject(PUBLIC_TYPES.IStore) private store!: IStore;
  
  async getMaterialDetail(id: string): Promise<MaterialDetailDto> {
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
  }
  
  getUserInfo = async (): Promise<UserInfo> => {
    var a = 10;
    const userInfo: UserInfo = await this.store.getUserInfo();
    a = 10;
    const position: Position = await this.store.getCurrentPosition();
    a = 11;
    const weather: Weather = await this.getWeather(position.coord.latitude, position.coord.longitude);
    a = 12;
    userInfo.position = position;
    userInfo.weather = weather;
    
    return userInfo;
  }
  
  createMaterial = async (name: string, description: string, image: any, bleDeviceId: string): Promise<CreateMaterialDto> => {
    const imageName: string = this.genImageName();
    
    var a = 10;
    
    const userInfo: UserInfo = await this.getUserInfo();
    
    const user: User | null = await this.store.getUser()!;
    const ownerId: string = user!.id;
    
    // const res: CreateMaterialSdo = await this.processRepo.createMaterial(ownerId, name, description, imageName, bleDeviceId, userInfo);
    const res: CreateMaterialSdo = {isSuccess: true, message: ''};
    
    let material: Material | null = null;
    if (res.isSuccess && res.material) {
      material = this.mappingMaterial(res.material);
      if (material) {
        await this.processRepo.uploadMaterialImage(material.id, imageName, image);
      }
    }
    
    const dto: CreateMaterialDto = {
      ...this.populate(res),
      material: material
    };
    
    return dto;
  }
  
  private async getWeather(latitude: number, longitude: number): Promise<Weather> {
    const res: WeatherDataSdo = await this.ibusinessRepo.getWeather(latitude, longitude);
    const weather: Weather = this.mappingWeather(res.weather);
    
    return weather;
  }
  
  private genImageName = (): string => {
    const imageName: string = `${uuidv4().toString().replace(/-/g,'')}.jpg`;
    return imageName;
  }
}
import {BaseRepository} from "./baserepository";
import {
  IProcessRepo,
  GoodsListSdo,
  LoginSdo,
  ProcessListSdo,
  MaterialDetailSdo,
  ProcessDetailSdo,
  CreateMaterialSdo,
  CreateMaterialRequest
} from "../../repositories";
import {inject, injectable} from "inversify";
import {IWebApi, ApiResult} from "../../webapi";
import {PUBLIC_TYPES, PRIVATE_TYPES} from "../identifiers";
import {STORAGE_KEYS, CONSTANTS, API, API_STATUS_CODE} from "../../common";
import {Bluetooth, UserInfo} from '../../models';
@injectable()
export class ProcessRepo extends BaseRepository implements IProcessRepo {
  @inject(PUBLIC_TYPES.IWebApi) private api!: IWebApi;
  
  async getMaterialDetail(id: string): Promise<MaterialDetailSdo> {
    const res: ApiResult = await this.api.get(API.GET_MATERIAL(id));
    let sdo: MaterialDetailSdo = {
      ...this.transform(res),
      material: res.data
    };
    return sdo;
  }
  
  createMaterial = async (ownerId: string,
                          name: string,
                          description: string,
                          imagName: string,
                          bluetooth: Bluetooth | null,
                          userInfo: UserInfo): Promise<CreateMaterialSdo> => {
    const req: CreateMaterialRequest = {
      ownerId: ownerId,
      name: name,
      description: description,
      imageName: imagName,
      bluetooth: bluetooth,
      userInfo: userInfo
    };
    
    const res: ApiResult = await this.api.post(API.CREATE_MATERIAL(), req);
    const sdo: CreateMaterialSdo = {
      ...this.transform(res),
      material: res.data
    };
    
    return sdo;
  }
  
  
  async getProcesses(userId: string): Promise<ProcessListSdo> {
    const res: ApiResult = await this.api.get(API.GET_PROCESSES(userId));
    const sdo: ProcessListSdo = {
      ...this.transform(res),
      materials: res.data ? res.data : []
    };
    return sdo;
  }
  
  
  async uploadMaterialImage(id: string, imageUri: string, imageName: string): Promise<boolean> {
    const fileUris: string[] = [imageUri];
    const fileNames: string[] = [imageName];
    const fileTypes: string[] = ['image/jpg'];
    
    const res: ApiResult = await this.api.uploadFiles(
      API.UPLOAD_IMAGES(id),
      fileUris,
      fileNames,
      fileTypes
    );
    
    return res.code === API_STATUS_CODE.OK;
  }
}

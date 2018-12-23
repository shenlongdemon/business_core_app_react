import {BaseRepository} from "./baserepository";
import {
  IProcessRepo,
  ProcessListSdo,
  MaterialDetailSdo,
  CreateMaterialSdo,
  BaseSdo,
  ProcessSdo,
  CreateMaterialRequest,
  UpdateProcessDynPropertiesReq,
  AssignWorkerSdo,
  AssignWorkerReq
} from "../../repositories";
import {inject, injectable} from "inversify";
import {IWebApi, ApiResult} from "../../webapi";
import {PUBLIC_TYPES} from "../identifiers";
import { API, API_STATUS_CODE} from "../../common";

@injectable()
export class ProcessRepo extends BaseRepository implements IProcessRepo {
  @inject(PUBLIC_TYPES.IWebApi) private api!: IWebApi;
  
  getMaterialDetail = async (id: string): Promise<MaterialDetailSdo> => {
    const res: ApiResult = await this.api.get(API.GET_MATERIAL(id));
    let sdo: MaterialDetailSdo = {
      ...this.transform(res),
      material: res.data
    };
    return sdo;
  }
  
  createMaterial = async (name: string,
                          description: string,
                          imageName: string,
                          bluetooth: any | null,
                          owner: any): Promise<CreateMaterialSdo> => {
    const req: CreateMaterialRequest = {
      owner: owner,
      name: name,
      description: description,
      imageUrl: imageName,
      bluetooth: bluetooth,
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
  
  updateProcessDynProperties = async (materialId: string, processId: string, properties: any): Promise<BaseSdo> => {
    const req: UpdateProcessDynPropertiesReq = {
      materialId: materialId,
      processId: processId,
      properties: properties
    };
    const res: ApiResult = await this.api.post(API.UPDATE_PROCESS_DYN_PROPERTIES(), req);
    const sdo: BaseSdo = {
      ...this.transform(res)
    };
    return sdo;
  }
  
  assignWorker = async (userId: string, materialId: string, processId: string): Promise<AssignWorkerSdo> => {
    const req: AssignWorkerReq = {userId, materialId, processId};
    const res: ApiResult = await this.api.post(API.ASSIGN_WORKER(), req);
    return {
      ...this.transform(res),
      user: res.data
    };
  }
  
  getProcess = async (materialId: string, processId: string): Promise<ProcessSdo> => {
    const req: any = {materialId: materialId, processId: processId};
    const res: ApiResult = await this.api.post(API.GET_PROCESS(), req);
    return {
      ...this.transform(res),
      process: res.data
    };
  }
}

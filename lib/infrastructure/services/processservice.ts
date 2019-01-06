import {
  ActivitiesListDto,
  AssignWorkerDto,
  BaseDto,
  CreateMaterialDto,
  IProcessService,
  MaterialDetailDto,
  ProcessDto,
  ProcessListDto,
  IBusinessService
} from '../../services';
import {
  Activity,
  Bluetooth,
  DynProperty,
  DynPropertyType,
  Material,
  Position,
  Process,
  ProcessStatus,
  User,
  UserInfo,
  Weather
} from '../../models';
import {BaseService} from './baseservice';
import {inject, injectable} from 'inversify';
import {PRIVATE_TYPES, PUBLIC_TYPES} from '../identifiers';
import {
  ActivitiesListSdo,
  AssignWorkerSdo,
  BaseSdo,
  CreateMaterialSdo,
  IBusinessRepo,
  IProcessRepo,
  IStore,
  MaterialDetailSdo,
  ProcessListSdo,
  ProcessSdo,
  WeatherDataSdo
} from '../../repositories';
import {CONSTANTS} from '../../common';
import {Category} from 'business_core_app_react/lib/models/category';

// @ts-ignore
const uuidv4 = require('uuid/v4');

@injectable()
export class ProcessService extends BaseService implements IProcessService {
  @inject(PRIVATE_TYPES.IProcessRepo) private processRepo!: IProcessRepo;
  @inject(PRIVATE_TYPES.IBusinessRepo) private businessRepo!: IBusinessRepo;
  @inject(PUBLIC_TYPES.IStore) private store!: IStore;
  @inject(PUBLIC_TYPES.IBusinessService) private businessService!: IBusinessService;
  
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
  
  
  
  createMaterial = async (
    name: string,
    description: string,
    imageUri: string,
    bluetooth: Bluetooth | null
  ): Promise<CreateMaterialDto> => {
    console.log('BEGIN createMaterial at ' + Date.now());
    
    const userInfo: UserInfo = await this.businessService.getUserInfo();
    let imageName: string = CONSTANTS.STR_EMPTY;
    if (imageUri !== CONSTANTS.STR_EMPTY) {
      imageName = this.genImageName();
      await this.businessRepo.uploadImage(imageName, imageUri);
    }
    
    const res: CreateMaterialSdo = await this.processRepo.createMaterial(
      name,
      description,
      imageName,
      bluetooth,
      userInfo
    );
    
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
  
  assignWorker = async (userId: string, materialId: string, processId: string): Promise<AssignWorkerDto> => {
    const sdo: AssignWorkerSdo = await this.processRepo.assignWorker(userId, materialId, processId);
    let user: User | null = null;
    if (sdo.isSuccess && sdo.user) {
      user = this.mappingUser(sdo.user);
    }
    return {
      ...this.populate(sdo),
      user
    };
  };
  
  
  
  updateProcessDynProperties = async (
    materialId: string,
    processId: string,
    properties: DynProperty[]
  ): Promise<BaseDto> => {
    const fileNames: string[] = [];
    const fileTypes: string[] = [];
    const fileUris: string[] = [];
    
    properties.forEach(
      (p: DynProperty): void => {
        if (p.type === DynPropertyType.IMAGE && p.value.startsWith('content')) {
          const name: string = this.genImageName();
          fileUris.push(p.value);
          fileNames.push(name);
          fileTypes.push('image/png');
          p.value = name;
        } else if (p.type === DynPropertyType.FILE && p.value.startsWith('content')) {
          const name: string = this.genPDFName();
          fileUris.push(p.value);
          fileNames.push(name);
          fileTypes.push('application/pdf');
          p.value = name;
        }
      }
    );
    
    if (fileUris.length > 0) {
      await this.businessRepo.uploadFiles(fileUris, fileNames, fileTypes);
    }
    
    const sdo: BaseSdo = await this.processRepo.updateProcessDynProperties(materialId, processId, properties);
    return {...this.populate(sdo)};
  };
  
  getProcess = async (materialId: string, processId: string): Promise<ProcessDto> => {
    const sdo: ProcessSdo = await this.processRepo.getProcess(materialId, processId);
    let process: Process | null = null;
    if (sdo.isSuccess && sdo.process) {
      process = this.mappingProcess(sdo.process);
    }
    return {
      ...this.populate(sdo),
      process
    };
  };
  
  getActivities = async (materialId: string, processId: string, workerId: string): Promise<ActivitiesListDto> => {
    const sdo: ActivitiesListSdo = await this.processRepo.getActivities(materialId, processId, workerId);
    let activities: Activity[] = [];
    if (sdo.isSuccess && sdo.activities) {
      activities = this.mappingList(sdo.activities);
    }
    return {
      ...this.populate(sdo),
      activities
    };
  };
  
  addActivity = async (
    materialId: string,
    processId: string,
    title: string,
    description: string,
    imageUri: string,
    fileUri: string
  ): Promise<BaseDto> => {
    const fileNames: string[] = [];
    const fileTypes: string[] = [];
    const fileUris: string[] = [];
    let image: string = CONSTANTS.STR_EMPTY;
    let file: string = CONSTANTS.STR_EMPTY;
    if (imageUri !== CONSTANTS.STR_EMPTY) {
      const name: string = this.genImageName();
      fileUris.push(imageUri);
      fileNames.push(name);
      fileTypes.push('image/png');
      image = name;
    }
    
    if (fileUri !== CONSTANTS.STR_EMPTY) {
      const name: string = this.genPDFName();
      fileUris.push(fileUri);
      fileNames.push(name);
      fileTypes.push('application/pdf');
      file = name;
    }
    if (fileUris.length > 0) {
      await this.businessRepo.uploadFiles(fileUris, fileNames, fileTypes);
    }
    const userInfo: UserInfo = await this.businessService.getUserInfo();
    const sdo: BaseSdo = await this.processRepo.addActivity(
      materialId,
      processId,
      title,
      description,
      image,
      file,
      userInfo
    );
    
    return {...this.populate(sdo)};
  };
  
  doneProcess = async (materialId: string, processId: string): Promise<BaseDto> => {
    const userInfo: UserInfo = await this.businessService.getUserInfo();
    const sdo: BaseSdo = await this.processRepo.doneProcess(materialId, processId, userInfo);
    return {
      ...this.populate(sdo)
    };
  };
  
  getLastFinishProcessIndex = (processes: Process[]): number => {
    let index: number = 0;
    processes.forEach(
      (process: Process, idx: number): void => {
        if (process.status === ProcessStatus.DONE) {
          index = idx + 1;
        }
      }
    );
    return index;
  };
  
  calcFinishedInPercen = (processes: Process[]): number => {
    let total: number = 0;
    let count: number = 0;
    processes.forEach(
      (process: Process): void => {
        if (process.status === ProcessStatus.DONE) {
          count += 2;
        }
        if (process.status === ProcessStatus.IN_PROGRESS) {
          count += 1;
        }
        total += 2;
      }
    );
    return count / total;
  };
  
  
}

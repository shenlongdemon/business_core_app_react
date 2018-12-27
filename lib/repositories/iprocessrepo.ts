///<reference path="../infrastructure/repositpries/processrepo.ts"/>

import {
  MaterialDetailSdo,
  ActivitiesListSdo,
  CreateMaterialSdo,
  ProcessListSdo,
  BaseSdo,
  AssignWorkerSdo,
  ProcessSdo
} from "./sdo";

export interface IProcessRepo {
  createItem(name: string, price: number, description: string, imageName: string, category: any, bluetooth: any | null, material: any | null, userInfo: any): BaseSdo | PromiseLike<BaseSdo>;
  
  doneProcess(materialId: string, processId: string, userInfo: any): Promise<BaseSdo>;
  
  addActivity(materialId: string, processId: string, title: string, description: string, image: string, file: string, userInfo: any): BaseSdo | PromiseLike<BaseSdo>;
  
  getActivities(materialId: string, processId: string, workerId: string): Promise<ActivitiesListSdo>;
  
  getProcess(materialId: string, processId: string): Promise<ProcessSdo>;
  
  assignWorker(userId: string, materialId: string, processId: string): Promise<AssignWorkerSdo>;
  
  updateProcessDynProperties(materialId: string, processId: string, properties: any): PromiseLike<BaseSdo>;
  
  getProcesses(userId: string): Promise<ProcessListSdo>;
  
  uploadMaterialImage(materialId: string, imageUri: string, imageName: string): Promise<boolean>;
  
  createMaterial(name: string,
                 description: string,
                 imageName: string,
                 bluetooth: any | null,
                 owner: any): Promise<CreateMaterialSdo>;
  
  getMaterialDetail(id: string): Promise<MaterialDetailSdo>;
}

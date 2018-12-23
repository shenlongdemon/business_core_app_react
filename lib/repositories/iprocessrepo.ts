///<reference path="../infrastructure/repositpries/processrepo.ts"/>

import {MaterialDetailSdo, CreateMaterialSdo, ProcessListSdo, BaseSdo, AssignWorkerSdo, ProcessSdo} from "./sdo";
import {Bluetooth} from "../models";

export interface IProcessRepo {
  getProcess(materialId: string, processId: string): Promise<ProcessSdo>;
  
  assignWorker(userId: string, materialId: string, processId: string): Promise<AssignWorkerSdo>;
  
  updateProcessDynProperties(materialId: string, processId: string, properties: any): PromiseLike<BaseSdo>;
  
  getProcesses(userId: string): Promise<ProcessListSdo>;
  
  uploadMaterialImage(materialId: string, imageUri: string, imageName: string): Promise<boolean>;
  
  createMaterial(name: string,
                 description: string,
                 imageName: string,
                 bluetooth: Bluetooth | null,
                 owner: any): Promise<CreateMaterialSdo>;
  
  getMaterialDetail(id: string): Promise<MaterialDetailSdo>;
}

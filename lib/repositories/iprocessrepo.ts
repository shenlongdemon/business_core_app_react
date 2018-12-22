///<reference path="../infrastructure/repositpries/processrepo.ts"/>

import {MaterialDetailSdo, CreateMaterialSdo, ProcessListSdo, BaseSdo} from "./sdo";
import {Bluetooth} from "../models";

export interface IProcessRepo {
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

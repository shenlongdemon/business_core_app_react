///<reference path="../infrastructure/repositpries/processrepo.ts"/>

import {MaterialDetailSdo, CreateMaterialSdo, ProcessListSdo} from "./sdo";
import {Bluetooth} from "../models";

export interface IProcessRepo {
  getProcesses(userId: string): Promise<ProcessListSdo>;
  
  uploadMaterialImage(materialId: string, imageUri: string, imageName: string): Promise<boolean>;
  
  createMaterial(ownerId: string,
                 name: string,
                 description: string,
                 imageName: string,
                 bluetooth: Bluetooth | null,
                 userInfo: any): Promise<CreateMaterialSdo>;
  
  getMaterialDetail(id: string): Promise<MaterialDetailSdo>;
}

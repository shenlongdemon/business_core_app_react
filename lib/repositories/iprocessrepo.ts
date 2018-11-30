///<reference path="../infrastructure/repositpries/processrepo.ts"/>

import {MaterialDetailSdo, CreateMaterialSdo} from "./sdo";

export interface IProcessRepo {
  
  uploadMaterialImage(materialId: string, imageData: any, imageName: string): Promise<boolean>;
  
  createMaterial(
    ownerId: string,
    name: string,
    description: string,
    imageName: string,
    bleDeviceId: string,
    userInfo: any
  ): Promise<CreateMaterialSdo>;
  
  getMaterialDetail(id: string): Promise<MaterialDetailSdo>;
}

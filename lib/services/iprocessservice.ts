/// <reference path="../infrastructure/services/processservice.ts" />

import {CreateMaterialDto, MaterialDetailDto, ProcessListDto, BaseDto} from "./dto";
import {Bluetooth, Process, DynProperty} from "../models";

export interface IProcessService {
  /**
   * Update process detail with dynamic infomation
   * @param process
   */
  updateProcessDynProperties(materialId: string, processId: string, properties: DynProperty[]): Promise<BaseDto>;
  
  getProcesses(): Promise<ProcessListDto>;
  
  /**
   * get magerial full detail by id
   * @param id
   */
  getMaterialDetail(id: string): Promise<MaterialDetailDto>;

  /**
   * create material
   * @param name name of material
   * @param description description
   * @param imageName 74d1fc0e-1cb2-429c-8c87-7663fd0e3e0e.jpg and replace '-' to ''
   * @param bleDeviceId bluetooth id or empty string
   */
  createMaterial(
    name: string,
    description: string,
    imageUri: string,
    bluetooth: Bluetooth| null
  ): Promise<CreateMaterialDto>;
}

import { BaseRepository } from "./baserepository";
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
import { inject, injectable } from "inversify";
import { IWebApi, ApiResult } from "../../webapi";
import { PUBLIC_TYPES, PRIVATE_TYPES } from "../identifiers";
import { STORAGE_KEYS, CONSTANTS, API, API_STATUS_CODE } from "../../common";

@injectable()
export class ProcessRepo extends BaseRepository implements IProcessRepo {
  @inject(PUBLIC_TYPES.IWebApi) private api!: IWebApi;

  async getMaterialDetail(id: string): Promise<MaterialDetailSdo> {
    const res: ApiResult = await this.api.get(API.GET_MATERIAL(id));
    let sdo: MaterialDetailSdo = {
      ...this.transform(res),
      material: res.Data
    };
    return sdo;
  }

  async createMaterial(
    ownerId: string,
    name: string,
    description: string,
    imageName: string,
    bleDeviceId: string,
    userInfo: any
  ): Promise<CreateMaterialSdo> {
    const req: CreateMaterialRequest = {
      ownerId: ownerId,
      name: name,
      description: description,
      imageUrl: imageName,
      bluetooth: bleDeviceId,
      userInfo: userInfo
    };

    const res: ApiResult = await this.api.post(API.CREATE_MATERIAL(), req);
    const sdo: CreateMaterialSdo = {
      ...this.transform(res),
      material: res.Data
    };

    return sdo;
  }

  async uploadMaterialImage(
    id: string,
    imageName: string,
    image: any
  ): Promise<boolean> {
    const files: any[] = [image];
    const fileNames: string[] = [imageName];

    const res: ApiResult = await this.api.uploadFiles(
      API.UPLOAD_IMAGES(id),
      files,
      fileNames
    );

    return res.Status === API_STATUS_CODE.OK;
  }
}

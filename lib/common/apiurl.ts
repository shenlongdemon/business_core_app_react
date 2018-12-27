import { ENV } from "../config";

const API = {
  LOGIN: (): string => {
    return ENV.HOST + "/api/sellrecognizer/login";
  },
  GET_ITEMS(userId: string): string {
    return (
      ENV.HOST +
      "/api/sellrecognizer/getItemsByOwnerId?ownerId=" +
      userId +
      '&pageNum=1&pageSize=10000"'
    );
  },
  GET_PROCESSES(userId: string): string {
    return `${
      ENV.HOST
    }/api/sellrecognizer/getMaterialsByOwnerId?id=${userId}`;
  },
  GET_MATERIAL(id: string): string {
    return `${ENV.HOST}/api/sellrecognizer/getMaterialById?id=${id}`;
  },
  UPLOAD_IMAGES(id: string): string {
    return `${ENV.HOST}/api/upload/manifactory/activity?id=${id}`;
  },
  CREATE_MATERIAL(): string {
    return `${ENV.HOST}/api/sellrecognizer/createMaterial`;
  },
  CREATE_ITEM(): string {
    return `${ENV.HOST}/api/sellrecognizer/createItem`;
  },
  UPDATE_PROCESS_DYN_PROPERTIES(): string {
    return `${ENV.HOST}/api/sellrecognizer/updateProcessDynProperties`;
  },
  GET_WEATHER(latitude: number, longitude: number): string {
    return `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=6435508fad5982cda8c0a812d7a57860&units=metric`;
  },
  GET_OBJECT_BY_CODE(): string {
    return `${ENV.HOST}/api/sellrecognizer/getObjectByCode`;
  },
  UPLOAD_FILES(): string {
    return `${ENV.HOST}/upload/sellrecognizer`;
  },
  ASSIGN_WORKER(): string {
    return `${ENV.HOST}/api/sellrecognizer/assignWorker`;
  },
  GET_PROCESS(): string {
    return `${ENV.HOST}/api/sellrecognizer/getProcess`;
  },
  GET_ACTIVITIES(): string {
    return `${ENV.HOST}/api/sellrecognizer/getActivities`;
  },
  ADD_ACTIVITY(): string {
    return `${ENV.HOST}/api/sellrecognizer/addActivity`;
  },
  DONE_PROCESS(): string {
    return `${ENV.HOST}/api/sellrecognizer/doneProcess`;
  },
  GeT_CODE_DESCRIPTION(): string {
    return `${ENV.HOST}/api/sellrecognizer/getCodeDescription`;
  },
  GET_OBJECTS_BY_BLUETOOTH_IDS(): string {
    return `${ENV.HOST}/api/sellrecognizer/getObjectsByBluetoothIds`;
  },
  GET_CATEGORIES(): string {
    return `${ENV.HOST}/api/sellrecognizer/getCategories`;
  },
};
export { API };

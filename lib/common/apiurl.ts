import { ENV } from "../config";

const API = {
  LOGIN: (): string => {
    return ENV.HOST + "/api/manifactory/login";
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
    }/api/manifactory/getMaterialsByOwnerId?id=${userId}&pageSize=10000&pageNum=1`;
  },
  GET_MATERIAL(id: string): string {
    return `${ENV.HOST}/api/manifactory/getMaterialById?id=${id}`;
  },
  UPLOAD_IMAGES(id: string): string {
    return `${ENV.HOST}/api/upload/manifactory/activity?id=${id}`;
  },
  UPLOAD_FILES(id: string): string {
    return `${ENV.HOST}/api/upload/manifactory/activity?id=${id}`;
  },
  CREATE_MATERIAL(): string {
    return `${ENV.HOST}/api/manifactory/createMaterial`;
  },
  GET_WEATHER(latitude: number, longitude: number): string {
    return `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=6435508fad5982cda8c0a812d7a57860&units=metric`;
  },
  GET_OBJECT_BY_QRCODE(): string {
    return `${ENV.HOST}/api/manifactory/getObjectByQRCode`;
  }
};
export { API };

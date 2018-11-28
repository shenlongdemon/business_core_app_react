import { ENV } from "../config";
export class LOGGER {
  static log = (data: any): void => {
    if (ENV.IS_DEBUG()) {
      console.log(data);
    }
  };
}

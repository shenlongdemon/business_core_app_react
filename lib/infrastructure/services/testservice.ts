import { ITestService } from "../../services/itestservice";
import { injectable } from "inversify";

@injectable()
export class TestService implements ITestService {
  constructor() {}

  get = (): string => {
    return "Implemented";
  };
}

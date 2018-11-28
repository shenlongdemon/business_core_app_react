import builder from "./ioc";

export class FactoryInjection {
  public static bindNewable = <T>(
    type: string,
    constructor: { new (...args: any[]): T }
  ): void => {
    builder.bind<T>(type).to(constructor);
  };

  public static bindSingleton = <T>(
    type: string,
    constructor: { new (...args: any[]): T }
  ): void => {
    builder
      .bind<T>(type)
      .to(constructor)
      .inSingletonScope();
  };

  public static get = <T>(type: string): T => {
    return builder.get<T>(type);
  };
}

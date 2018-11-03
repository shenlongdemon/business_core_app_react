import builder from './ioc';

export class FactoryInjection {
    
    public static bindNewable = <T>(type: symbol, constructor: {new (...args: any[]): T;}): void => {
        builder.bind<T>(type).to(constructor);
    }

    public static bindSingleton = <T>(type: symbol, constructor: {new (...args: any[]): T;}): void => {
        builder.bind<T>(type).to(constructor).inSingletonScope();
    }

    public static newable = <T>(type: symbol): T => {
        return builder.get<T>(type);
    }
}
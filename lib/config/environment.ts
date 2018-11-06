export class ENV {
    static HOST: string = '';
    static IS_DEBUGGER: boolean = true;
    static config = (configuration: any): void => {
        Object.assign(ENV, configuration);
    }
}
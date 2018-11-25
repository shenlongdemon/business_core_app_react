export class ENV {
  static HOST: string = '';
  private static IS_DEBUGGER: string = '';
  static config = (configuration: any): void => {
    Object.assign(ENV, configuration);
  }
  static IS_DEBUG = (): boolean => {
    return ENV.IS_DEBUGGER === 'true';
  }
}
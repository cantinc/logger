import Logger from './Logger';
declare const logger: Logger;
export declare const log: (processName: string) => (target: any, prop: string, desc: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
export default logger;

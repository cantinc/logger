export declare type Callback = () => any;
export default class Logger {
    private readonly deep;
    log(...ars: any[]): any;
    private callCallback;
    start(id: string, callback?: Callback): any;
    end(id: string, error?: string): void;
    next(prevId: string, nextId: string, error?: string): void;
}

export declare type Callback = () => any;
export default class Logger {
    private readonly deep;
    private lastId;
    private lastCount;
    protected _log(text: string): void;
    log(text: string): void;
    protected moveUp(): void;
    private callCallback;
    start(id: string, callback?: Callback): any;
    end(id: string, error?: string): void;
    next(prevId: string, nextId: string, error?: string): void;
}

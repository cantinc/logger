export declare function createDecorator(callback: (id: string, callback: () => any) => any): (processName: string) => (target: any, prop: string, desc: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;

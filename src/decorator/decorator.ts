export function createDecorator (callback: (id: string, callback: () => any) => any) {
  return function log (processName: string) {
    return (target: any, prop: string, desc: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> => {
      return desc.value
        ? {
            ...desc,
            value (...args) {
              return callback(processName, () => desc.value.apply(this, args))
            },
          }
        : {
            ...desc,
            get () {
              return callback(processName, () => desc.get.apply(this))
            },
          }
    }
  }
}

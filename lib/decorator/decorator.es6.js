function createDecorator(callback) {
    return function log(processName) {
        return (target, prop, desc) => {
            return desc.value
                ? Object.assign(Object.assign({}, desc), { value(...args) {
                        return callback(processName, () => desc.value.apply(this, args));
                    } }) : Object.assign(Object.assign({}, desc), { get() {
                    return callback(processName, () => desc.get.apply(this));
                } });
        };
    };
}

export { createDecorator };

export const observer = {
    funcMaps: new Map(),
    register(id, func) {
        this.funcMaps.set(id, func);
    },
    async emit(id, data = null) {
        const func = this.funcMaps.get(id);
        if (func && typeof func === "function") {
            return await func(data);
        }
    }
};

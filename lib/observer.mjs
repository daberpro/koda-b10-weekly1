export const observer = {
    func_maps: new Map(),
    register(id, func) {
        this.func_maps.set(id, func);
    },
    async emit(id, data = null) {
        const func = this.func_maps.get(id);
        if (func && typeof func === "function") {
            await func(data);
        }
    }
};
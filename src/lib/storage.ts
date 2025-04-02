export const storage = {
    local: {
        get: async <T>(key: string): Promise<T> => {
            const value = await chrome.storage.local.get(key);
            return value[key];
        },
        set: async <T>(key: string, value: T) => {
            await chrome.storage.local.set({ [key]: value });
        },
        remove: async (key: string) => {
            await chrome.storage.local.remove(key);
        },
        clear: async () => {
            await chrome.storage.local.clear();
        },
    },
};
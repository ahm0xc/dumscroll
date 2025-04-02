export const storage = {
    local: {
        get: async (key: string) => {
            const value = await chrome.storage.local.get(key);
            return value[key];
        },
        set: async (key: string, value: any) => {
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
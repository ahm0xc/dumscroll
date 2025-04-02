import React from "react";

export default function useChromeStorage<T>(key: string, defaultValue: T) {
    const [value, setInternalValue] = React.useState<T>(defaultValue);

    React.useEffect(() => {
        async function getStorageValue() {
            const result = await chrome.storage.local.get(key);
            if (result[key] === undefined) {
                await chrome.storage.local.set({ [key]: defaultValue });
                return defaultValue;
            }
            return result[key] as T;
        }
        getStorageValue().then((value) => {
            setInternalValue(value);
        });
    }, [key]);

    React.useEffect(() => {
        chrome.storage.onChanged.addListener((changes, namespace) => {
            if (namespace === "local" && changes[key]) {
                setInternalValue(changes[key].newValue as T);
            }
        });
    }, [value, key]);

    function setValue(value: T) {
        setInternalValue(value);
        chrome.storage.local.set({ [key]: value });
    }

    return [value, setValue] as const;
}

import React from "react";

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = React.useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    }
    catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, value]);

  const setStoredValue = React.useCallback(
    (newValue: T | ((prevValue: T) => T)) => {
      setValue((prevValue) => {
        const valueToStore = typeof newValue === "function"
          ? (newValue as ((prevValue: T) => T))(prevValue)
          : newValue;
        try {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        catch (error) {
          console.error(`Error writing to localStorage key "${key}":`, error);
        }
        return valueToStore;
      });
    },
    [key],
  );

  return [value, setStoredValue] as const;
}

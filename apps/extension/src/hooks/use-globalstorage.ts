import { useEffect, useState } from "react";

import { GlobalStorage } from "~/helpers/globalstorage";

export default function useGlobalStorage<T>(defaultValue: T, { key }: { key: string }) {
  const [value, setValue] = useState<T>(defaultValue);

  function set(v: T) {
    async function INTERNAL__set() {
      const res = await GlobalStorage.set(key, v);
      res && setValue(res.value);
    }
    INTERNAL__set();
  }

  useEffect(() => {
    async function getAndSetValue() {
      const v = await GlobalStorage.get(key);
      if (v === null || typeof v === "undefined") {
        set(defaultValue);
      } else {
        set(v as T);
      }
    }
    getAndSetValue();
  }, [key]);

  return { value, set };
}

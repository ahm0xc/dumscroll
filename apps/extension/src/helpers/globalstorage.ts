export const GlobalStorage = {
  get,
  set,
};
/**
 * Retrieves a value from the Chrome runtime storage.
 *
 * @param key - The key of the value to retrieve.
 * @returns The value associated with the given key, or `null` if an error occurs.
 *
 * @remarks
 * This function sends a message to the Chrome runtime to retrieve the value associated with the given key.
 * If an error occurs during the process, it logs an error message to the console and returns `null`.
 * Otherwise, it returns the retrieved value.
 */
async function get(key: string) {
  const value = await new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        action: "getStorageValue",
        key,
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(
            `🚨 Error on GlobalStorage.get("${key}"): `,
            chrome.runtime.lastError.message,
          );
          resolve(null);
        } else {
          resolve(response.value);
        }
      },
    );
  });

  return value;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function set(key: string, value: any) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let res: any = { key, value };

  await new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        action: "setStorageValue",
        key,
        value,
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error(
            `🚨 Error on GlobalStorage.set("${key}"): `,
            chrome.runtime.lastError.message,
          );
          res = null;
        }
        resolve(res);
      },
    );
  });

  return res;
}

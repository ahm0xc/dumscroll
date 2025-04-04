export function listenForChanges(key: string, callback: (newValue: any) => void) {
  chrome.storage.local.get(key, (result) => {
    callback(result[key]);
  });
  chrome.storage.local.onChanged.addListener((changes) => {
    if (changes[key]) {
      callback(changes[key].newValue);
    }
  });
}

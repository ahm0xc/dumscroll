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

export function listenAndHandleHideElement(key: string, selector: string) {
  listenForChanges(key, (newValue) => {
    if (newValue) {
      const style = document.createElement("style");
      style.id = key;
      style.textContent = `${selector} { display: none; }`;
      document.head.appendChild(style);
    }
    else {
      const style = document.getElementById(key);
      if (style)
        style.remove();
    }
  });
}

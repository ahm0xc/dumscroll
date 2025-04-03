function listenForChanges(key: string, callback: (newValue: any) => void) {
    chrome.storage.local.get(key, (result) => {
        callback(result[key]);
    });
    chrome.storage.local.onChanged.addListener((changes) => {
        if (changes[key]) {
            callback(changes[key].newValue);
        }
    });
}

listenForChanges("cs-facebook-remove-watch", (newValue) => {
    if (newValue) {
        const style = document.createElement("style");
        style.id = "facebook-remove-watch";
        style.textContent = `
        li:has(a[href^="/watch"]),
        li:has(a[href^="https://www.facebook.com/watch/"])
         {
            display: none;
        }
    `;
        document.head.appendChild(style);
    } else {
        const style = document.getElementById("facebook-remove-watch");
        if (style) {
            style.remove();
        }
    }
});

listenForChanges("cs-facebook-remove-stories", (newValue) => {
    if (newValue) {
        const style = document.createElement("style");
        style.id = "facebook-remove-stories";
        style.textContent = `
        .x193iq5w.xgmub6v.x1ceravr:has([aria-label="stories tray"]) {
            display: none;
        }
    `;
        document.head.appendChild(style);
    } else {
        const style = document.getElementById("facebook-remove-stories");
        if (style) {
            style.remove();
        }
    }
});

listenForChanges("cs-facebook-remove-feed", (newValue) => {
    if (newValue) {
        const style = document.createElement("style");
        style.id = "facebook-remove-feed";
        style.textContent = `
        .x1hc1fzr.x1unhpq9.x6o7n8i:has(h3[dir="auto"]) {
            display: none;
        }
    `;
        document.head.appendChild(style);
    } else {
        const style = document.getElementById("facebook-remove-feed");
        if (style) {
            style.remove();
        }
    }
});

listenForChanges("cs-facebook-remove-reels", (newValue) => {
    if (newValue) {
        const style = document.createElement("style");
        style.id = "cs-facebook-remove-reels";
        style.textContent = `
        div.x1lliihq:has(div[aria-label="Reels"]) {
            display: none;
        }`;
        document.head.appendChild(style);
    } else {
        const style = document.getElementById("cs-facebook-remove-reels");
        if (style) {
            style.remove();
        }
    }
});

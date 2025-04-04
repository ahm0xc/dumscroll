import { listenForChanges } from "./utils";

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
  }
  else {
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
  }
  else {
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
  }
  else {
    const style = document.getElementById("facebook-remove-feed");
    if (style) {
      style.remove();
    }
  }
});

listenForChanges("cs-facebook-remove-reels", (newValue) => {
  function blockArrowKeys(event: KeyboardEvent) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  if (newValue) {
    const style = document.createElement("style");
    style.id = "cs-facebook-remove-reels";
    style.textContent = `
        div.x1lliihq:has(div[aria-label="Reels"]) {
            display: none;
        }
        div[aria-label="Previous Card"] {
            display: none;
        }
        div[aria-label="Next Card"] {
            display: none;
        }
        `;
    document.head.appendChild(style);
    document.addEventListener("keydown", blockArrowKeys, true);
  }
  else {
    const style = document.getElementById("cs-facebook-remove-reels");
    if (style) {
      style.remove();
    }
    document.removeEventListener("keydown", blockArrowKeys, true);
  }
});

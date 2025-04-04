import { listenForChanges } from "./utils";

listenForChanges("cs-twitter-remove-feed", (newValue) => {
  if (newValue) {
    const style = document.createElement("style");
    style.id = "cs-twitter-remove-feed";
    style.textContent = `
        div[aria-label="Home timeline"] > div.css-175oi2r.r-f8sm7e.r-13qz1uu.r-1ye8kvj {
            display: none;
        }
        `;
    document.head.appendChild(style);
  }
  else {
    const style = document.getElementById("cs-twitter-remove-feed");
    if (style) {
      style.remove();
    }
  }
});

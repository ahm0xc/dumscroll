import detectUrlChange from "detect-url-change";

import { settings } from "~/config";
import { GlobalStorage } from "~/helpers/globalstorage";
// import { handleDefaultBlocks } from ".";

// // import "./facebook.css";

async function main() {
  GlobalStorage.get(settings.platformDefaults.facebook.blockReels.key).then((v) => {
    if (!v) return;

    detectUrlChange.on("change", (newUrl) => {
      // handleDefaultBlocks(newUrl);
    });
  });
}
main();

// function removeFBWatch() {
//   const style = document.createElement("style");
//   style.textContent = `
//     li:has(a[aria-label="Video"]) {
//         display: none !important;
//     }
//     li:has(a[href="https://www.facebook.com/watch/"]) {
//         display: none !important;
//     }
//     #watch_feed > div > div:nth-child(2) {
//         display: none !important;
//     }
//     div.x78zum5.x1n2onr6.xh8yej3:has(div > div > div > div[aria-label='Reels']) {
//         display: none !important;
//     }
// `;
//   document.head.appendChild(style);

//   detectUrlChange.on("change", (newUrl) => {
//     if (newUrl.includes("/watch")) {
//       window.location.replace("https://facebook.com");
//     }
//     if (newUrl.includes("reel")) {
//       window.location.replace("https://facebook.com");
//     }
//   });
// }

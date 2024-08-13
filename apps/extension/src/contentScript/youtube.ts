// import detectUrlChange from "detect-url-change";
// import { trackTime } from "./track-time";

// function main() {
//   chrome.runtime.sendMessage(
//     { action: "getStorageValue", key: "is-yt-shorts-blocked" },
//     (response) => {
//       if (chrome.runtime.lastError) {
//         console.error(chrome.runtime.lastError.message);
//       } else {
//         const isShortsBlocked = response.value;

//         if (isShortsBlocked) {
//           blockYoutubeShorts();
//         }
//       }
//     },
//   );
// }

// main();
// trackTime({ platform: "youtube" });

// function blockYoutubeShorts() {
//   const style = document.createElement("style");
//   style.textContent = `
//     a[title='Shorts'] {
//       display: none !important;
//     }
//     ytd-rich-shelf-renderer[is-shorts] {
//       display: none !important;
//     }
//     ytd-reel-shelf-renderer {
//       display: none !important;
//     }
//   `;
//   document.head.appendChild(style);

//   detectUrlChange.on("change", (newUrl) => {
//     if (newUrl.includes("/shorts/")) {
//       const url = new URL(newUrl);
//       const v = url.pathname.split("/").pop();
//       window.location.replace(`https://youtu.be/watch?v=${v}`);
//     }
//   });
// }

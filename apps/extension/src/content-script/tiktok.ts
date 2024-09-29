// import detectUrlChange from "detect-url-change";

// function main() {
//   chrome.runtime.sendMessage({ action: "getStorageValue", key: "is-tiktok-blocked" }, (res) => {
//     if (chrome.runtime.lastError) {
//       console.error(chrome.runtime.lastError.message);
//     } else {
//       const isTiktokBanned = res.value;

//       if (isTiktokBanned) {
//         banTiktok();
//       }
//     }
//   });
// }
// main();

// function banTiktok() {
//   const style = document.createElement("style");
//   style.textContent = `
//   body {
//     overflow: hidden !important;
//   }

//   body::before {
//     content: "This app isn't available";
//     position: fixed !important;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     inset: 0;
//     background-color: black;
//     color: white !important;
//     z-index: 9999999999999999;
//   }
//   `;
//   document.head.appendChild(style);

//   detectUrlChange.on("change", (newUrl) => {
//     if (!newUrl.includes("/404")) {
//       window.location.replace("https://www.tiktok.com/404");
//     }
//   });
// }

import detectUrlChange from "detect-url-change";

function main() {
  chrome.runtime.sendMessage(
    { action: "getStorageValue", key: "is-ig-reels-blocked" },
    (res) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        const isIGReelsBlocked = res.value;

        if (isIGReelsBlocked) {
          removeIGReels();
        }
      }
    },
  );
}

main();

function removeIGReels() {
  const style = document.createElement("style");
  style.textContent = `
    a[href="/reels/"] {
      display: none !important;
    }
    body[data-lock-scroll="true"] main .x1odjw0f {
      overflow-y: hidden !important;
    }
  `;
  document.head.appendChild(style);

  detectUrlChange.on("change", (newUrl) => {
    if (newUrl.includes("/reels/")) {
      const url = new URL(newUrl);
      if (url.pathname.includes("/reels/")) {
        document.body.setAttribute("data-lock-scroll", "true");
      } else {
        document.body.setAttribute("data-lock-scroll", "false");
      }
    }
  });
}

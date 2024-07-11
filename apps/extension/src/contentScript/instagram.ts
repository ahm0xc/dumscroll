import detectUrlChange from "detect-url-change";
import "./instagram.css";

function main() {
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

main();

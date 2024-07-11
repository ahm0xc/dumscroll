import detectUrlChange from "detect-url-change";
import "./tiktok.css";

function main() {
  detectUrlChange.on("change", (newUrl) => {
    if (!newUrl.includes("/404")) {
      window.location.replace("https://www.tiktok.com/404");
    }
  });
}
main();

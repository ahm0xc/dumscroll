import { defineManifest } from "@crxjs/vite-plugin";
import packageData from "../package.json";

//@ts-ignore
const isDev = process.env.NODE_ENV === "development";

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? " ➡️ Dev" : ""}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: "img/16.png",
    32: "img/32.png",
    48: "img/48.png",
    128: "img/128.png",
  },
  action: {
    // default_popup: "popup.html",
    default_icon: "img/48.png",
  },
  options_page: "options.html",
  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      js: ["src/contentScript/index.ts"],
    },
    // {
    //   matches: ["*://*.youtube.com/*", "*://youtu.be/*"],
    //   js: ["src/contentScript/youtube.ts"],
    // },
    // {
    //   matches: ["https://*.instagram.com/*"],
    //   js: ["src/contentScript/instagram.ts"],
    // },
    // {
    //   matches: ["https://*.tiktok.com/*", "https://*.vt.tiktok.com/*"],
    //   js: ["src/contentScript/tiktok.ts"],
    // },
    // {
    //   matches: ["*://*.facebook.com/*"],
    //   js: ["src/contentScript/facebook.ts"],
    // },
  ],
  web_accessible_resources: [
    {
      resources: ["img/16.png", "img/32.png", "img/48.png", "img/128.png"],
      matches: [],
    },
  ],
  permissions: ["storage", "tabs", "webNavigation", "webRequest", "activeTab"],
});

import { defineManifest } from "@crxjs/vite-plugin";

import packageData from "../package.json";

// eslint-disable-next-line node/no-process-env
const isDev = process.env.NODE_ENV === "development";

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ""}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: "img/logo-16.png",
    32: "img/logo-34.png",
    48: "img/logo-48.png",
    128: "img/logo-128.png",
  },
  action: {
    default_icon: "img/logo-48.png",
  },
  // options_page: "options.html",
  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      js: ["src/content-script/index.ts"],
      run_at: "document_end",
    },
    {
      matches: ["https://www.facebook.com/*"],
      js: ["src/content-script/customizations/facebook.ts"],
      run_at: "document_start",
    },
    {
      matches: ["https://www.x.com/*", "https://x.com/*"],
      js: ["src/content-script/customizations/twitter.ts"],
      run_at: "document_start",
    },
    {
      matches: ["https://www.instagram.com/*"],
      js: ["src/content-script/customizations/instagram.ts"],
      run_at: "document_start",
    },
    {
      matches: ["https://www.youtube.com/*", "https://youtube.com/*"],
      js: ["src/content-script/customizations/youtube.ts"],
      run_at: "document_start",
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        "img/logo-16.png",
        "img/logo-34.png",
        "img/logo-48.png",
        "img/logo-128.png",
      ],
      matches: [],
    },
  ],
  host_permissions: ["http://*/*", "https://*/*"],
  permissions: ["storage", "webNavigation", "tabs", "history"],
  chrome_url_overrides: {
    newtab: "new-tab.html",
  },
});

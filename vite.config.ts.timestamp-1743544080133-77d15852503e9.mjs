// vite.config.ts
import { crx } from "file:///Users/ahmed/tests/dumscroll-repo/dumscroll/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.31/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import react from "file:///Users/ahmed/tests/dumscroll-repo/dumscroll/node_modules/.pnpm/@vitejs+plugin-react@4.3.4_vite@4.5.9_@types+node@22.13.4_lightningcss@1.29.1_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import * as path from "node:path";
import { defineConfig } from "file:///Users/ahmed/tests/dumscroll-repo/dumscroll/node_modules/.pnpm/vite@4.5.9_@types+node@22.13.4_lightningcss@1.29.1/node_modules/vite/dist/node/index.js";

// src/manifest.ts
import { defineManifest } from "file:///Users/ahmed/tests/dumscroll-repo/dumscroll/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.31/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  name: "dumscroll",
  displayName: "Dumscroll",
  type: "module",
  version: "0.0.0",
  description: "",
  author: "**",
  license: "MIT",
  engines: {
    node: ">=14.18.0"
  },
  scripts: {
    dev: "vite",
    build: "tsc && vite build",
    preview: "vite preview",
    zip: "npm run build && node src/zip.js",
    lint: "eslint .",
    "lint:fix": "eslint --fix .",
    "build:watch": "nodemon --watch 'src/**/*.{ts,tsx}' --exec 'npm run build'",
    prepare: "husky"
  },
  dependencies: {
    "@radix-ui/react-slot": "^1.1.2",
    "class-variance-authority": "^0.7.1",
    clsx: "^2.1.1",
    "lucide-react": "^0.475.0",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    zustand: "^5.0.3"
  },
  devDependencies: {
    "@antfu/eslint-config": "^4.11.0",
    "@crxjs/vite-plugin": "^2.0.0-beta.19",
    "@eslint-react/eslint-plugin": "^1.38.2",
    "@types/chrome": "^0.0.246",
    "@types/node": "^22.13.4",
    "@types/react": "^18.2.28",
    "@types/react-dom": "^18.2.13",
    "@vitejs/plugin-react": "^4.1.0",
    autoprefixer: "^10.4.20",
    eslint: "^9.23.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    gulp: "^4.0.2",
    "gulp-zip": "^6.0.0",
    husky: "^9.1.7",
    "lint-staged": "^15.5.0",
    nodemon: "^3.1.9",
    postcss: "^8.5.3",
    tailwindcss: "3",
    typescript: "^5.2.2",
    vite: "^4.4.11"
  },
  pnpm: {
    onlyBuiltDependencies: [
      "es5-ext",
      "esbuild",
      "fsevents"
    ]
  },
  "lint-staged": {
    "*": "npm run lint"
  }
};

// src/manifest.ts
var isDev = process.env.NODE_ENV === "development";
var manifest_default = defineManifest({
  name: `${package_default.displayName || package_default.name}${isDev ? ` \u27A1\uFE0F Dev` : ""}`,
  description: package_default.description,
  version: package_default.version,
  manifest_version: 3,
  icons: {
    16: "img/logo-16.png",
    32: "img/logo-34.png",
    48: "img/logo-48.png",
    128: "img/logo-128.png"
  },
  action: {
    default_icon: "img/logo-48.png"
  },
  options_page: "options.html",
  background: {
    service_worker: "src/background/index.ts",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      js: ["src/content-script/index.ts"],
      run_at: "document_end"
    }
  ],
  web_accessible_resources: [
    {
      resources: [
        "img/logo-16.png",
        "img/logo-34.png",
        "img/logo-48.png",
        "img/logo-128.png"
      ],
      matches: []
    }
  ],
  host_permissions: ["http://*/*", "https://*/*"],
  permissions: ["storage", "webNavigation", "tabs"]
});

// vite.config.ts
var __vite_injected_original_dirname = "/Users/ahmed/tests/dumscroll-repo/dumscroll";
var vite_config_default = defineConfig(() => {
  return {
    build: {
      emptyOutDir: true,
      outDir: "build",
      rollupOptions: {
        output: {
          chunkFileNames: "assets/chunk-[hash].js"
        }
      }
    },
    resolve: {
      alias: {
        "~": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    plugins: [crx({ manifest: manifest_default }), react()]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9haG1lZC90ZXN0cy9kdW1zY3JvbGwtcmVwby9kdW1zY3JvbGxcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9haG1lZC90ZXN0cy9kdW1zY3JvbGwtcmVwby9kdW1zY3JvbGwvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FobWVkL3Rlc3RzL2R1bXNjcm9sbC1yZXBvL2R1bXNjcm9sbC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGNyeCB9IGZyb20gXCJAY3J4anMvdml0ZS1wbHVnaW5cIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcblxuaW1wb3J0IG1hbmlmZXN0IGZyb20gXCIuL3NyYy9tYW5pZmVzdFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBidWlsZDoge1xuICAgICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgICBvdXREaXI6IFwiYnVpbGRcIixcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwiYXNzZXRzL2NodW5rLVtoYXNoXS5qc1wiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIFwiflwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgcGx1Z2luczogW2NyeCh7IG1hbmlmZXN0IH0pLCByZWFjdCgpXSxcbiAgfTtcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWhtZWQvdGVzdHMvZHVtc2Nyb2xsLXJlcG8vZHVtc2Nyb2xsL3NyY1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FobWVkL3Rlc3RzL2R1bXNjcm9sbC1yZXBvL2R1bXNjcm9sbC9zcmMvbWFuaWZlc3QudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FobWVkL3Rlc3RzL2R1bXNjcm9sbC1yZXBvL2R1bXNjcm9sbC9zcmMvbWFuaWZlc3QudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gXCJAY3J4anMvdml0ZS1wbHVnaW5cIjtcblxuaW1wb3J0IHBhY2thZ2VEYXRhIGZyb20gXCIuLi9wYWNrYWdlLmpzb25cIjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tcHJvY2Vzcy1lbnZcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTWFuaWZlc3Qoe1xuICBuYW1lOiBgJHtwYWNrYWdlRGF0YS5kaXNwbGF5TmFtZSB8fCBwYWNrYWdlRGF0YS5uYW1lfSR7aXNEZXYgPyBgIFx1MjdBMVx1RkUwRiBEZXZgIDogXCJcIn1gLFxuICBkZXNjcmlwdGlvbjogcGFja2FnZURhdGEuZGVzY3JpcHRpb24sXG4gIHZlcnNpb246IHBhY2thZ2VEYXRhLnZlcnNpb24sXG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gIGljb25zOiB7XG4gICAgMTY6IFwiaW1nL2xvZ28tMTYucG5nXCIsXG4gICAgMzI6IFwiaW1nL2xvZ28tMzQucG5nXCIsXG4gICAgNDg6IFwiaW1nL2xvZ28tNDgucG5nXCIsXG4gICAgMTI4OiBcImltZy9sb2dvLTEyOC5wbmdcIixcbiAgfSxcbiAgYWN0aW9uOiB7XG4gICAgZGVmYXVsdF9pY29uOiBcImltZy9sb2dvLTQ4LnBuZ1wiLFxuICB9LFxuICBvcHRpb25zX3BhZ2U6IFwib3B0aW9ucy5odG1sXCIsXG4gIGJhY2tncm91bmQ6IHtcbiAgICBzZXJ2aWNlX3dvcmtlcjogXCJzcmMvYmFja2dyb3VuZC9pbmRleC50c1wiLFxuICAgIHR5cGU6IFwibW9kdWxlXCIsXG4gIH0sXG4gIGNvbnRlbnRfc2NyaXB0czogW1xuICAgIHtcbiAgICAgIG1hdGNoZXM6IFtcImh0dHA6Ly8qLypcIiwgXCJodHRwczovLyovKlwiXSxcbiAgICAgIGpzOiBbXCJzcmMvY29udGVudC1zY3JpcHQvaW5kZXgudHNcIl0sXG4gICAgICBydW5fYXQ6IFwiZG9jdW1lbnRfZW5kXCIsXG4gICAgfSxcbiAgXSxcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgIFwiaW1nL2xvZ28tMTYucG5nXCIsXG4gICAgICAgIFwiaW1nL2xvZ28tMzQucG5nXCIsXG4gICAgICAgIFwiaW1nL2xvZ28tNDgucG5nXCIsXG4gICAgICAgIFwiaW1nL2xvZ28tMTI4LnBuZ1wiLFxuICAgICAgXSxcbiAgICAgIG1hdGNoZXM6IFtdLFxuICAgIH0sXG4gIF0sXG4gIGhvc3RfcGVybWlzc2lvbnM6IFtcImh0dHA6Ly8qLypcIiwgXCJodHRwczovLyovKlwiXSxcbiAgcGVybWlzc2lvbnM6IFtcInN0b3JhZ2VcIiwgXCJ3ZWJOYXZpZ2F0aW9uXCIsIFwidGFic1wiXSxcbn0pO1xuIiwgIntcbiAgXCJuYW1lXCI6IFwiZHVtc2Nyb2xsXCIsXG4gIFwiZGlzcGxheU5hbWVcIjogXCJEdW1zY3JvbGxcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJcIixcbiAgXCJhdXRob3JcIjogXCIqKlwiLFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJlbmdpbmVzXCI6IHtcbiAgICBcIm5vZGVcIjogXCI+PTE0LjE4LjBcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwiYnVpbGRcIjogXCJ0c2MgJiYgdml0ZSBidWlsZFwiLFxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxuICAgIFwiemlwXCI6IFwibnBtIHJ1biBidWlsZCAmJiBub2RlIHNyYy96aXAuanNcIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLlwiLFxuICAgIFwibGludDpmaXhcIjogXCJlc2xpbnQgLS1maXggLlwiLFxuICAgIFwiYnVpbGQ6d2F0Y2hcIjogXCJub2RlbW9uIC0td2F0Y2ggJ3NyYy8qKi8qLnt0cyx0c3h9JyAtLWV4ZWMgJ25wbSBydW4gYnVpbGQnXCIsXG4gICAgXCJwcmVwYXJlXCI6IFwiaHVza3lcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAcmFkaXgtdWkvcmVhY3Qtc2xvdFwiOiBcIl4xLjEuMlwiLFxuICAgIFwiY2xhc3MtdmFyaWFuY2UtYXV0aG9yaXR5XCI6IFwiXjAuNy4xXCIsXG4gICAgXCJjbHN4XCI6IFwiXjIuMS4xXCIsXG4gICAgXCJsdWNpZGUtcmVhY3RcIjogXCJeMC40NzUuMFwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXG4gICAgXCJ0YWlsd2luZC1tZXJnZVwiOiBcIl4zLjAuMVwiLFxuICAgIFwidGFpbHdpbmRjc3MtYW5pbWF0ZVwiOiBcIl4xLjAuN1wiLFxuICAgIFwienVzdGFuZFwiOiBcIl41LjAuM1wiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBhbnRmdS9lc2xpbnQtY29uZmlnXCI6IFwiXjQuMTEuMFwiLFxuICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiXjIuMC4wLWJldGEuMTlcIixcbiAgICBcIkBlc2xpbnQtcmVhY3QvZXNsaW50LXBsdWdpblwiOiBcIl4xLjM4LjJcIixcbiAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjI0NlwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjIuMTMuNFwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjIuMjhcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMi4xM1wiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4xLjBcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjIwXCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOS4yMy4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjUuMi4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LXJlZnJlc2hcIjogXCJeMC40LjE5XCIsXG4gICAgXCJndWxwXCI6IFwiXjQuMC4yXCIsXG4gICAgXCJndWxwLXppcFwiOiBcIl42LjAuMFwiLFxuICAgIFwiaHVza3lcIjogXCJeOS4xLjdcIixcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiXjE1LjUuMFwiLFxuICAgIFwibm9kZW1vblwiOiBcIl4zLjEuOVwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjUuM1wiLFxuICAgIFwidGFpbHdpbmRjc3NcIjogXCIzXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMi4yXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuNC4xMVwiXG4gIH0sXG4gIFwicG5wbVwiOiB7XG4gICAgXCJvbmx5QnVpbHREZXBlbmRlbmNpZXNcIjogW1xuICAgICAgXCJlczUtZXh0XCIsXG4gICAgICBcImVzYnVpbGRcIixcbiAgICAgIFwiZnNldmVudHNcIlxuICAgIF1cbiAgfSxcbiAgXCJsaW50LXN0YWdlZFwiOiB7XG4gICAgXCIqXCI6IFwibnBtIHJ1biBsaW50XCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxTQUFTLFdBQVc7QUFDdlUsT0FBTyxXQUFXO0FBQ2xCLFlBQVksVUFBVTtBQUN0QixTQUFTLG9CQUFvQjs7O0FDSDRSLFNBQVMsc0JBQXNCOzs7QUNBeFY7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLGFBQWU7QUFBQSxFQUNmLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxFQUNYLGFBQWU7QUFBQSxFQUNmLFFBQVU7QUFBQSxFQUNWLFNBQVc7QUFBQSxFQUNYLFNBQVc7QUFBQSxJQUNULE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFXO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxTQUFXO0FBQUEsSUFDWCxLQUFPO0FBQUEsSUFDUCxNQUFRO0FBQUEsSUFDUixZQUFZO0FBQUEsSUFDWixlQUFlO0FBQUEsSUFDZixTQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsY0FBZ0I7QUFBQSxJQUNkLHdCQUF3QjtBQUFBLElBQ3hCLDRCQUE0QjtBQUFBLElBQzVCLE1BQVE7QUFBQSxJQUNSLGdCQUFnQjtBQUFBLElBQ2hCLE9BQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLGtCQUFrQjtBQUFBLElBQ2xCLHVCQUF1QjtBQUFBLElBQ3ZCLFNBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQix3QkFBd0I7QUFBQSxJQUN4QixzQkFBc0I7QUFBQSxJQUN0QiwrQkFBK0I7QUFBQSxJQUMvQixpQkFBaUI7QUFBQSxJQUNqQixlQUFlO0FBQUEsSUFDZixnQkFBZ0I7QUFBQSxJQUNoQixvQkFBb0I7QUFBQSxJQUNwQix3QkFBd0I7QUFBQSxJQUN4QixjQUFnQjtBQUFBLElBQ2hCLFFBQVU7QUFBQSxJQUNWLDZCQUE2QjtBQUFBLElBQzdCLCtCQUErQjtBQUFBLElBQy9CLE1BQVE7QUFBQSxJQUNSLFlBQVk7QUFBQSxJQUNaLE9BQVM7QUFBQSxJQUNULGVBQWU7QUFBQSxJQUNmLFNBQVc7QUFBQSxJQUNYLFNBQVc7QUFBQSxJQUNYLGFBQWU7QUFBQSxJQUNmLFlBQWM7QUFBQSxJQUNkLE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTix1QkFBeUI7QUFBQSxNQUN2QjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGVBQWU7QUFBQSxJQUNiLEtBQUs7QUFBQSxFQUNQO0FBQ0Y7OztBRDVEQSxJQUFNLFFBQVEsUUFBUSxJQUFJLGFBQWE7QUFFdkMsSUFBTyxtQkFBUSxlQUFlO0FBQUEsRUFDNUIsTUFBTSxHQUFHLGdCQUFZLGVBQWUsZ0JBQVksSUFBSSxHQUFHLFFBQVEsc0JBQVksRUFBRTtBQUFBLEVBQzdFLGFBQWEsZ0JBQVk7QUFBQSxFQUN6QixTQUFTLGdCQUFZO0FBQUEsRUFDckIsa0JBQWtCO0FBQUEsRUFDbEIsT0FBTztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osS0FBSztBQUFBLEVBQ1A7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsY0FBYztBQUFBLEVBQ2QsWUFBWTtBQUFBLElBQ1YsZ0JBQWdCO0FBQUEsSUFDaEIsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLElBQ2Y7QUFBQSxNQUNFLFNBQVMsQ0FBQyxjQUFjLGFBQWE7QUFBQSxNQUNyQyxJQUFJLENBQUMsNkJBQTZCO0FBQUEsTUFDbEMsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFDQSwwQkFBMEI7QUFBQSxJQUN4QjtBQUFBLE1BQ0UsV0FBVztBQUFBLFFBQ1Q7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxTQUFTLENBQUM7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBLEVBQ0Esa0JBQWtCLENBQUMsY0FBYyxhQUFhO0FBQUEsRUFDOUMsYUFBYSxDQUFDLFdBQVcsaUJBQWlCLE1BQU07QUFDbEQsQ0FBQzs7O0FEOUNELElBQU0sbUNBQW1DO0FBUXpDLElBQU8sc0JBQVEsYUFBYSxNQUFNO0FBQ2hDLFNBQU87QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNMLGFBQWE7QUFBQSxNQUNiLFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQVUsYUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDdEM7QUFBQSxJQUNGO0FBQUEsSUFFQSxTQUFTLENBQUMsSUFBSSxFQUFFLDJCQUFTLENBQUMsR0FBRyxNQUFNLENBQUM7QUFBQSxFQUN0QztBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

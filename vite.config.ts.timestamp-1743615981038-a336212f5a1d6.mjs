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
    "@radix-ui/react-switch": "^1.1.3",
    "class-variance-authority": "^0.7.1",
    clsx: "^2.1.1",
    "lucide-react": "^0.475.0",
    motion: "^12.6.3",
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
    },
    {
      matches: ["https://www.facebook.com/*"],
      js: ["src/content-script/customizations/facebook.ts"],
      run_at: "document_start"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9haG1lZC90ZXN0cy9kdW1zY3JvbGwtcmVwby9kdW1zY3JvbGxcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9haG1lZC90ZXN0cy9kdW1zY3JvbGwtcmVwby9kdW1zY3JvbGwvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FobWVkL3Rlc3RzL2R1bXNjcm9sbC1yZXBvL2R1bXNjcm9sbC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGNyeCB9IGZyb20gXCJAY3J4anMvdml0ZS1wbHVnaW5cIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcblxuaW1wb3J0IG1hbmlmZXN0IGZyb20gXCIuL3NyYy9tYW5pZmVzdFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBidWlsZDoge1xuICAgICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgICBvdXREaXI6IFwiYnVpbGRcIixcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwiYXNzZXRzL2NodW5rLVtoYXNoXS5qc1wiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIFwiflwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgcGx1Z2luczogW2NyeCh7IG1hbmlmZXN0IH0pLCByZWFjdCgpXSxcbiAgfTtcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWhtZWQvdGVzdHMvZHVtc2Nyb2xsLXJlcG8vZHVtc2Nyb2xsL3NyY1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FobWVkL3Rlc3RzL2R1bXNjcm9sbC1yZXBvL2R1bXNjcm9sbC9zcmMvbWFuaWZlc3QudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FobWVkL3Rlc3RzL2R1bXNjcm9sbC1yZXBvL2R1bXNjcm9sbC9zcmMvbWFuaWZlc3QudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gXCJAY3J4anMvdml0ZS1wbHVnaW5cIjtcblxuaW1wb3J0IHBhY2thZ2VEYXRhIGZyb20gXCIuLi9wYWNrYWdlLmpzb25cIjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tcHJvY2Vzcy1lbnZcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTWFuaWZlc3Qoe1xuICBuYW1lOiBgJHtwYWNrYWdlRGF0YS5kaXNwbGF5TmFtZSB8fCBwYWNrYWdlRGF0YS5uYW1lfSR7aXNEZXYgPyBgIFx1MjdBMVx1RkUwRiBEZXZgIDogXCJcIn1gLFxuICBkZXNjcmlwdGlvbjogcGFja2FnZURhdGEuZGVzY3JpcHRpb24sXG4gIHZlcnNpb246IHBhY2thZ2VEYXRhLnZlcnNpb24sXG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gIGljb25zOiB7XG4gICAgMTY6IFwiaW1nL2xvZ28tMTYucG5nXCIsXG4gICAgMzI6IFwiaW1nL2xvZ28tMzQucG5nXCIsXG4gICAgNDg6IFwiaW1nL2xvZ28tNDgucG5nXCIsXG4gICAgMTI4OiBcImltZy9sb2dvLTEyOC5wbmdcIixcbiAgfSxcbiAgYWN0aW9uOiB7XG4gICAgZGVmYXVsdF9pY29uOiBcImltZy9sb2dvLTQ4LnBuZ1wiLFxuICB9LFxuICBvcHRpb25zX3BhZ2U6IFwib3B0aW9ucy5odG1sXCIsXG4gIGJhY2tncm91bmQ6IHtcbiAgICBzZXJ2aWNlX3dvcmtlcjogXCJzcmMvYmFja2dyb3VuZC9pbmRleC50c1wiLFxuICAgIHR5cGU6IFwibW9kdWxlXCIsXG4gIH0sXG4gIGNvbnRlbnRfc2NyaXB0czogW1xuICAgIHtcbiAgICAgIG1hdGNoZXM6IFtcImh0dHA6Ly8qLypcIiwgXCJodHRwczovLyovKlwiXSxcbiAgICAgIGpzOiBbXCJzcmMvY29udGVudC1zY3JpcHQvaW5kZXgudHNcIl0sXG4gICAgICBydW5fYXQ6IFwiZG9jdW1lbnRfZW5kXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbXCJodHRwczovL3d3dy5mYWNlYm9vay5jb20vKlwiXSxcbiAgICAgIGpzOiBbXCJzcmMvY29udGVudC1zY3JpcHQvY3VzdG9taXphdGlvbnMvZmFjZWJvb2sudHNcIl0sXG4gICAgICBydW5fYXQ6IFwiZG9jdW1lbnRfc3RhcnRcIixcbiAgICB9LFxuICBdLFxuICB3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXM6IFtcbiAgICB7XG4gICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgXCJpbWcvbG9nby0xNi5wbmdcIixcbiAgICAgICAgXCJpbWcvbG9nby0zNC5wbmdcIixcbiAgICAgICAgXCJpbWcvbG9nby00OC5wbmdcIixcbiAgICAgICAgXCJpbWcvbG9nby0xMjgucG5nXCIsXG4gICAgICBdLFxuICAgICAgbWF0Y2hlczogW10sXG4gICAgfSxcbiAgXSxcbiAgaG9zdF9wZXJtaXNzaW9uczogW1wiaHR0cDovLyovKlwiLCBcImh0dHBzOi8vKi8qXCJdLFxuICBwZXJtaXNzaW9uczogW1wic3RvcmFnZVwiLCBcIndlYk5hdmlnYXRpb25cIiwgXCJ0YWJzXCJdLFxufSk7XG4iLCAie1xuICBcIm5hbWVcIjogXCJkdW1zY3JvbGxcIixcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIkR1bXNjcm9sbFwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjBcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIlwiLFxuICBcImF1dGhvclwiOiBcIioqXCIsXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcImVuZ2luZXNcIjoge1xuICAgIFwibm9kZVwiOiBcIj49MTQuMTguMFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZFwiOiBcInRzYyAmJiB2aXRlIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJ6aXBcIjogXCJucG0gcnVuIGJ1aWxkICYmIG5vZGUgc3JjL3ppcC5qc1wiLFxuICAgIFwibGludFwiOiBcImVzbGludCAuXCIsXG4gICAgXCJsaW50OmZpeFwiOiBcImVzbGludCAtLWZpeCAuXCIsXG4gICAgXCJidWlsZDp3YXRjaFwiOiBcIm5vZGVtb24gLS13YXRjaCAnc3JjLyoqLyoue3RzLHRzeH0nIC0tZXhlYyAnbnBtIHJ1biBidWlsZCdcIixcbiAgICBcInByZXBhcmVcIjogXCJodXNreVwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkByYWRpeC11aS9yZWFjdC1zbG90XCI6IFwiXjEuMS4yXCIsXG4gICAgXCJAcmFkaXgtdWkvcmVhY3Qtc3dpdGNoXCI6IFwiXjEuMS4zXCIsXG4gICAgXCJjbGFzcy12YXJpYW5jZS1hdXRob3JpdHlcIjogXCJeMC43LjFcIixcbiAgICBcImNsc3hcIjogXCJeMi4xLjFcIixcbiAgICBcImx1Y2lkZS1yZWFjdFwiOiBcIl4wLjQ3NS4wXCIsXG4gICAgXCJtb3Rpb25cIjogXCJeMTIuNi4zXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICBcInRhaWx3aW5kLW1lcmdlXCI6IFwiXjMuMC4xXCIsXG4gICAgXCJ0YWlsd2luZGNzcy1hbmltYXRlXCI6IFwiXjEuMC43XCIsXG4gICAgXCJ6dXN0YW5kXCI6IFwiXjUuMC4zXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGFudGZ1L2VzbGludC1jb25maWdcIjogXCJeNC4xMS4wXCIsXG4gICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCJeMi4wLjAtYmV0YS4xOVwiLFxuICAgIFwiQGVzbGludC1yZWFjdC9lc2xpbnQtcGx1Z2luXCI6IFwiXjEuMzguMlwiLFxuICAgIFwiQHR5cGVzL2Nocm9tZVwiOiBcIl4wLjAuMjQ2XCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMi4xMy40XCIsXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMi4yOFwiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4yLjEzXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiOiBcIl40LjEuMFwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMjBcIixcbiAgICBcImVzbGludFwiOiBcIl45LjIzLjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtaG9va3NcIjogXCJeNS4yLjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtcmVmcmVzaFwiOiBcIl4wLjQuMTlcIixcbiAgICBcImd1bHBcIjogXCJeNC4wLjJcIixcbiAgICBcImd1bHAtemlwXCI6IFwiXjYuMC4wXCIsXG4gICAgXCJodXNreVwiOiBcIl45LjEuN1wiLFxuICAgIFwibGludC1zdGFnZWRcIjogXCJeMTUuNS4wXCIsXG4gICAgXCJub2RlbW9uXCI6IFwiXjMuMS45XCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNS4zXCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIjNcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4yLjJcIixcbiAgICBcInZpdGVcIjogXCJeNC40LjExXCJcbiAgfSxcbiAgXCJwbnBtXCI6IHtcbiAgICBcIm9ubHlCdWlsdERlcGVuZGVuY2llc1wiOiBbXG4gICAgICBcImVzNS1leHRcIixcbiAgICAgIFwiZXNidWlsZFwiLFxuICAgICAgXCJmc2V2ZW50c1wiXG4gICAgXVxuICB9LFxuICBcImxpbnQtc3RhZ2VkXCI6IHtcbiAgICBcIipcIjogXCJucG0gcnVuIGxpbnRcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1ULFNBQVMsV0FBVztBQUN2VSxPQUFPLFdBQVc7QUFDbEIsWUFBWSxVQUFVO0FBQ3RCLFNBQVMsb0JBQW9COzs7QUNINFIsU0FBUyxzQkFBc0I7OztBQ0F4VjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsYUFBZTtBQUFBLEVBQ2YsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsYUFBZTtBQUFBLEVBQ2YsUUFBVTtBQUFBLEVBQ1YsU0FBVztBQUFBLEVBQ1gsU0FBVztBQUFBLElBQ1QsTUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNULEtBQU87QUFBQSxJQUNQLE9BQVM7QUFBQSxJQUNULFNBQVc7QUFBQSxJQUNYLEtBQU87QUFBQSxJQUNQLE1BQVE7QUFBQSxJQUNSLFlBQVk7QUFBQSxJQUNaLGVBQWU7QUFBQSxJQUNmLFNBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ2Qsd0JBQXdCO0FBQUEsSUFDeEIsMEJBQTBCO0FBQUEsSUFDMUIsNEJBQTRCO0FBQUEsSUFDNUIsTUFBUTtBQUFBLElBQ1IsZ0JBQWdCO0FBQUEsSUFDaEIsUUFBVTtBQUFBLElBQ1YsT0FB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

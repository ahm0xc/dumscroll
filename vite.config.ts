import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import * as path from "node:path";
import { defineConfig } from "vite";

import manifest from "./src/manifest";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      emptyOutDir: true,
      outDir: "build",
      rollupOptions: {
        output: {
          chunkFileNames: "assets/chunk-[hash].js",
        },
      },
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },

    plugins: [crx({ manifest }), react()],
  };
});

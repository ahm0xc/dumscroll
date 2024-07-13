import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

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

    plugins: [crx({ manifest }), react(), tsconfigPaths()],
  };
});

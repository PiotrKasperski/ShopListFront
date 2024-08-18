/// <reference types="vitest" />
import dts from "vite-plugin-dts";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ exclude: "**/*.test.ts" }), react(), legacy()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  build: {
    manifest: true,
    rollupOptions: {
      external: ["**/*.test.tsx"],
    },
  },
});

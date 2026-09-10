import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" &&
          typeof warning.message === "string" &&
          warning.message.includes("use client") &&
          warning.id?.includes("framer-motion")
        ) {
          return;
        }

        warn(warning);
      },
    },
  },
});

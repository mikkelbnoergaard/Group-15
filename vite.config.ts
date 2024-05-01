/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
  },
  server: {
    //ip address and open port on our back-end server
    //host: '192.168.0.22',
    //port: 5000
  }
});

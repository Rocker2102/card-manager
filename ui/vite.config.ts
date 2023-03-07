import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  build: {
    outDir: "build"
  },
  server: {
    host: true,
    open: true,
    port: 3000
  },
  resolve: {
    alias: {
      components: "/src/components",
      views: "/src/views"
    }
  }
});

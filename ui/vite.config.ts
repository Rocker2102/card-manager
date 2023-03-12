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
        enabled: false
      }
    })
  ],
  build: {
    outDir: "build"
  },
  server: {
    host: true,
    open: true,
    port: 4000
  },
  resolve: {
    alias: {
      hooks: "/src/hooks",
      views: "/src/views",
      shared: "/src/shared",
      layouts: "/src/layouts",
      contexts: "/src/contexts",
      database: "/src/database",
      components: "/src/components"
    }
  }
});

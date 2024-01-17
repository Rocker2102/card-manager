import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import viteTsconfigPaths from "vite-tsconfig-paths";
// import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"]
      }
    }),
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
    // basicSsl()
  ],
  build: {
    outDir: "build"
  },
  server: {
    host: true,
    open: true,
    port: 4000
    // https: true
  },
  resolve: {
    alias: {
      hooks: "/src/hooks",
      views: "/src/views",
      shared: "/src/shared",
      helpers: "/src/helpers",
      typings: "/src/typings",
      layouts: "/src/layouts",
      contexts: "/src/contexts",
      database: "/src/database",
      components: "/src/components"
    }
  }
});

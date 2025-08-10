import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      manifest: {
        theme_color: "#2b2b2b",
        background_color: "#fff",
        description: "پلتفرم ویرا",
        name: "ویرا",
        start_url: "/",
        short_name: "ویرا",
        icons: [
          {
            src: "icons/android-icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "icons/android-icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "icons/android-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "icons/android-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "icons/android-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/apple-icon-120x120.png",
            sizes: "120x120",
            type: "image/png",
          },
          {
            src: "icons/apple-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

});



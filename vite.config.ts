import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// För GitHub Pages på https://fredtts.github.io/Temp/ kör: VITE_BASE_PATH=/Temp/ npm run build
const basePath = process.env.VITE_BASE_PATH || "";

export default defineConfig(({ mode }) => ({
  base: basePath || "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico"],
      workbox: {
        navigateFallbackDenylist: [/^\/~oauth/],
      },
      manifest: {
        name: "Håll koll på Tempen",
        short_name: "Tempen",
        description: "Logga och följ temperaturer i 8 rum",
        theme_color: "#2d3748",
        background_color: "#f7f5f2",
        display: "standalone",
        display_override: ["window", "standalone"],
        scope: basePath || "/",
        start_url: basePath || "/",
        icons: [
          {
            src: `${basePath || "/"}pwa-192x192.png`,
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: `${basePath || "/"}pwa-512x512.png`,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

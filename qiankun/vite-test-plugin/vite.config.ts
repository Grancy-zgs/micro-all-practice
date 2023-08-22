import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import qiankun from "vite-plugin-qiankun";

// https://vitejs.dev/config/
export default defineConfig({
  base: "http://localhost:7000/",
  server: {
    port: 7000,
    cors: true,
    origin: "http://localhost:7000/",
  },
  plugins: [
    vue(),
    qiankun("vite-test-plugin", {
      useDevMode: true,
    }),
  ],
});

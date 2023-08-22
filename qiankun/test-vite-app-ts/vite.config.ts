import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy"; // need this
import { legacyQiankun } from "vite-plugin-legacy-qiankun";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    origin: "http://localhost:6000/", // 解决资源访问
    port: 6000,
  },
  plugins: [
    vue(),
    legacy(),
    legacyQiankun({
      name: "vite-test-app",
      devSandbox: true,
    }),
  ],
});

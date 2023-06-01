import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 配置代理，解决跨域请求问题
  server: {
    proxy: {
      "/": {
        target: "https://apis.netstart.cn/bcomic/",
        changeOrigin: true,
        ws: false,
      },
    },
  },
});

import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// 引入vant样式按需自动引入组件
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({ // vant样式按需自动引入组件
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  
  // 配置代理，解决跨域请求问题
  // server: {
  //   proxy: {
  //     "/": {
  //       target: "https://apis.netstart.cn/bcomic/",
  //       changeOrigin: true,
  //       ws: false,
  //     },
  //   },
  // },
});

//---------------------bootstrap---------------------------
import "@/scss/customBootStrap.scss"; //优先引入bootstrap入口文件，使其可以被后续自定义样式与自定义主题覆盖
import "bootstrap/js/index.esm.js";
// -----------------bootstrap Icon 字体图标--------------------
import "bootstrap-icons/font/bootstrap-icons.css"; //最先导入bootstrap icon字体图标
// ---------------------阿里字体图标--------------------
import "@/font/iconfont.css";
//----------------------vant按需加载--------------------------
import "vant/es/style/base.css"; //vant预定义样式
import { Lazyload } from "vant";
const errorimage = new URL("./img/no-find.png", import.meta.url).href;
//-----------------------VUE初始化----------------------
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);
import backComponent from "./components/backComponent.vue";
//-----------------vue原生官方-------------------
app
  .use(createPinia())
  .use(router)
  .use(Lazyload, {
    error: errorimage,
    attempt: 1,
  })
  .component("back-component", backComponent)
  .mount("#app");
//---------------------bootstrap---------------------------
import "@/scss/customBootStrap.scss"; //优先引入bootstrap入口文件，使其可以被后续自定义样式与自定义主题覆盖
import "bootstrap/js/index.esm.js";
//----------------------预设常用样式/自定义样式--------------------------
import "@/scss/PresetStyle.scss";
import "@/scss/index.scss";

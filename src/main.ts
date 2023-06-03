//---------Vuetify--------------------------
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VLazy } from "vuetify/components";

const vuetify = createVuetify({
  components: {
    VLazy,
  },
});

//----bootstrap---------------------------
import "@/scss/customBootStrap.scss"; //优先引入bootstrap入口文件，使其可以被后续自定义样式与自定义主题覆盖
import "bootstrap/js/index.esm.js";
// bootstrap Icon 字体图标--------------------
import "bootstrap-icons/font/bootstrap-icons.css"; //最先导入bootstrap icon字体图标
//--------VUE初始化----------------------
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

//---------预设常用样式/自定义样式--------------------------
import "@/scss/PresetStyle.scss";
import "@/scss/index.scss";
import "@/scss/icon.scss";
const app = createApp(App);

//---------vant按需加载--------------------------
app.use(createPinia()).use(router).use(vuetify).mount("#app");

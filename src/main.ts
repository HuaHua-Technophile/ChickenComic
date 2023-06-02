//----bootstrap---------------------------
import "./scss/customBootStrap.scss"//优先引入bootstrap入口文件，使其可以被后续自定义样式与自定义主题覆盖
import "bootstrap/js/index.esm.js";
//--------VUE初始化----------------------
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";


//---------自定义样式--------------------------
import "./scss/preset.scss"
const app = createApp(App);

app.use(createPinia()).use(router).mount("#app");

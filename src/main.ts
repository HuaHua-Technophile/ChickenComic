//----bootstrap---------------------------
import "@/scss/customBootStrap.scss"; //优先引入bootstrap入口文件，使其可以被后续自定义样式与自定义主题覆盖
import "bootstrap/js/index.esm.js";
//--------VUE初始化----------------------
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { Switch,Button,Badge } from 'vant';

//---------预设常用样式/自定义样式--------------------------
import "@/scss/PresetStyle.scss";
import "@/scss/index.scss";
const app = createApp(App);

//---------vant按需加载--------------------------
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
app.use(Button)
app.use(Switch)


app.use(createPinia()).use(router).mount("#app");

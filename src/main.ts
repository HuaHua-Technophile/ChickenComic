//----bootstrap---------------------------
<<<<<<< HEAD
import "@/scss/customBootStrap.scss"; //优先引入bootstrap入口文件，使其可以被后续自定义样式与自定义主题覆盖
import "bootstrap/js/index.esm.js";
=======
import "./scss/customBootStrap.scss"//优先引入bootstrap入口文件，使其可以被后续自定义样式与自定义主题覆盖
// import "bootstrap/js/index.esm.js";
import "bootstrap/dist/js/bootstrap.bundle.js";
>>>>>>> 87eb974c8fd2d0661d3c0b40631bbdbe32b156a1
//--------VUE初始化----------------------
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

//---------自定义样式--------------------------
<<<<<<< HEAD
import "@/scss/PresetStyle.scss";
=======
import "./scss/PresetStyle.scss"
>>>>>>> 87eb974c8fd2d0661d3c0b40631bbdbe32b156a1
const app = createApp(App);

app.use(createPinia()).use(router).mount("#app");

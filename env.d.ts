/// <reference types="vite/client" />
declare module "*.vue" {
  import { App, defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void;
  };
  export default component;
}
declare module "lodash/debounce";
declare module "js-md5";
declare module "lodash/throttle";
declare module "swiper/element/bundle";
declare module "cube-ui";

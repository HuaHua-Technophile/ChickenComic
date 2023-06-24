import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { type userInfoType } from "@/utils/typeing";
export const useUserInfoStore = defineStore("global", () => {
  //登录信息----------------

  let userInfo = ref<userInfoType>(); //用户信息
  let Logged = ref(false); //判断用户是否已登陆，多个组件中可导入使用
  watch(
    userInfo,
    (newV) => {
      console.log("pinia用户信息更改了", newV);
      localStorage.setItem(`user${newV?.id}`, JSON.stringify(newV));
    },
    { deep: true }
  ); //数据持久化
  return {
    userInfo,
    Logged,
  };
});

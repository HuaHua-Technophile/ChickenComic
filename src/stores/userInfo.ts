import { ref, watch } from "vue";
import { defineStore } from "pinia";
export const useUserInfoStore = defineStore("global", () => {
  //登录信息----------------

  let userInfo: any = ref({});
  let Logged = ref(false);
  watch(
    userInfo,
    (newV: any) => {
      console.log("pinia用户信息更改了", newV);
      localStorage.setItem(`user${newV.id}`, JSON.stringify(newV));
    },
    { deep: true }
  );
  let setCollection = (arr: any): void => {
    userInfo.value.Collection = arr;
    console.log("修改了", userInfo.value);
  };
  return {
    userInfo,
    Logged,
    setCollection,
  };
});

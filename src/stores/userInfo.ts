import { ref, watch } from "vue";
import { defineStore } from "pinia";
export const useUserInfoStore = defineStore("global", () => {
  //登录信息----------------

  let userInfo = ref<{ id: number; collection: Array<object> }>();
  let Logged = ref(false);
  watch(
    userInfo,
    (newV) => {
      console.log("pinia用户信息更改了", newV);
      localStorage.setItem(`user${newV?.id}`, JSON.stringify(newV));
    },
    { deep: true }
  );
  return {
    userInfo,
    Logged,
  };
});

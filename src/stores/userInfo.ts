import { ref, watch } from "vue";
import { defineStore } from "pinia";
export const useUserInfoStore = defineStore("global", () => {
  //登录信息----------------
  interface UserInfo {
    id?: string;
  }
  let userInfo: UserInfo | any = ref<UserInfo>({});
  let Logged = ref(false);
  watch(userInfo, (newVal: UserInfo) => {
    localStorage.setItem(`user${newVal.id}`, JSON.stringify(newVal));
  });
  return {
    userInfo,
    Logged,
  };
});

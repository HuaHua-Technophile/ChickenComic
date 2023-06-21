import { ref, watch } from "vue";
import { defineStore } from "pinia";
export const useUserInfoStore = defineStore("global", () => {
  //登录信息----------------

  let userInfo = ref<{
    id: number;
    name: string;
    collection: Array<{
      id: string;
      vertical_cover: string;
      title: string;
      last_ord: number;
    }>;
    watchingHistory: Array<{
      id: number;
      historyIndex: number;
      HistoryListLength: number;
      historyComicList: {
        title: string;
        horizontal_cover: string;
      };
    }>;
  }>(); //用户信息
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

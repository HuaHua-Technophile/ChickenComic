import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useNowListStore = defineStore("nowList", () => {
  // 当前在看漫画章节状态---------------
  let nowComicList = ref();
  let nowIndex = ref();
  let nowListLength = ref();

  // 监听当前阅读的章节是否发生改变，改变则获取当前章节数据
  watch(
    nowComicList,
    () => {
      nowIndex.value = nowComicList.value.index;
      nowListLength.value = nowComicList.value.data.ep_list.length;
    },
    { deep: true }
  );

  return {
    nowComicList,
    nowIndex,
    nowListLength,
  };
});

import { ref, computed } from "vue";
import { defineStore } from "pinia";
export const useGlobalStore = defineStore("global", () => {
  // 主题修改
  let theme = ref("dark");
  let changeTheme = () => {
    console.log(theme);
    if (theme.value === "dark") {
      theme.value = "light";
      document.documentElement.dataset.bsTheme = "light";
      document.body.classList.add("lightBg");
      document.body.classList.remove("darkBg");
    } else {
      theme.value = "dark";
      document.documentElement.dataset.bsTheme = "dark";
      document.body.classList.add("darkBg");
      document.body.classList.remove("lightBg");
    }
  };
  //全局遮罩层
  let popupShow = ref(false);
  let popupInfo = ref("");
  return {
    theme,
    changeTheme,
    popupShow,
    popupInfo,
  };
});

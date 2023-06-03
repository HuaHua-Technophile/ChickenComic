<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import { useGlobalStore } from "../stores/counter";

  let settingAbout: any = ref<object | null>(null);
  let bs = ref({}); //Better scroll实例化后对象的存储

  onMounted(() => {
    bs.value = new BScroll(settingAbout.value, {
      click: true,
    });
  });

  let { theme, changeTheme }: any = useGlobalStore();
</script>

<template>
  <div ref="settingAbout" class="settingAbout w-100 h-100 noScrollBar">
    <!-- 滚动内容 -->
    <div
      class="ps-3 pe-3 overflow-hidden"
      style="--bs-bg-opacity: 0.2; min-height: 105vh">
      <!-- 夜间模式切换 -->
      <div
        class="form-check form-switch pt-3 pb-3 bg-body-secondary rounded-pill"
        style="margin-top: 300px; --bs-bg-opacity: 0.5">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          :checked="theme == 'dark'"
          @click="changeTheme" />
        <label class="form-check-label" for="flexSwitchCheckDefault"
          >ナイトモードです</label
        >
      </div>
      <!-- 关于 -->
      <!-- 隐私协议 -->
      <!-- 检查更新 -->
    </div>
  </div>
</template>

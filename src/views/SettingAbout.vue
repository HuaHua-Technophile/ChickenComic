<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import BScroll from "better-scroll"; //导入Better scroll核心

  let settingAbout: any = ref<object | null>(null);
  let bs = ref({}); //Better scroll实例化后对象的存储

  onMounted(() => {
    bs.value = new BScroll(settingAbout.value, {
      click: true,
    });
  });
</script>

<template>
  <div ref="settingAbout" class="settingAbout w-100 h-100 noScrollBar">
    <!-- 滚动内容 -->
    <div
      style="
        min-height: 105vh;
        background: linear-gradient(pink, transparent);
      "></div>
  </div>
</template>

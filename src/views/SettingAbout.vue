<script setup lang="ts">
  import { ref } from "vue";
  // import BScroll from "@better-scroll/core";
  // let bs = new BScroll({
  //   click: true,
  // });

  let settingAbout = ref(null);
  console.log(settingAbout.value);

  // watchEffect(() => {
  //   console.log(checked.value);
  // });
</script>

<template>
  <div ref="settingAbout" class="settingAbout w-100 h-100">
    <!-- 滚动内容 -->
    <div style="min-height: 105vh"></div>
  </div>
</template>

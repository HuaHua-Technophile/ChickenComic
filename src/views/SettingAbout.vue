<script setup lang="ts">
  import { ref, onMounted } from "vue";
  let settingAbout = ref(null);
  onMounted(() => {
    console.log("挂在了");
    console.log(settingAbout.value);
  });
</script>

<template>
  <div ref="settingAbout" class="settingAbout w-100 h-100">
    <!-- 滚动内容 -->
    <div style="min-height: 105vh"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { getImageIndex } from "@/api/content";

  // 获取漫画章节内容图片&索引
  let imgUrl: any = ref<string | null>(null);
  const getContentData = async () => {
    imgUrl.value = await getImageIndex({ epId: 664941 });
    console.log(imgUrl.value.data.images);
  };
  getContentData();
</script>

<template>
  <div id="app"></div>
</template>

<style lang="scss"></style>

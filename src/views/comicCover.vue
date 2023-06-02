<script setup lang="ts">
  import { ref } from "vue";
  import { useRoute } from "vue-router";
  import { getComicDetail } from "@/api/comicCover";
  // 从路由传参获取当前页面漫画的id
  const route = useRoute();
  let { id }: { id?: string } = route.query;
  const res: any = ref<object | null>(null);
  const getData = async () => {
    res.value = await getComicDetail(id!);
  };
  getData();
</script>
<template>
  <div class="comicCover">
    <!-- 头部返回按钮 -->
    <div class="ps-3"><i class="bi bi-arrow-left-short"></i></div>
    <!-- 漫画封面 -->
    <div class="mx-auto rounded-3" style="width: 80%">
      <img :src="res?.data.vertical_cover" class="w-100" />
    </div>
  </div>
</template>

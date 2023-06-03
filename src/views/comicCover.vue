<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { getComicDetail } from "@/api/comicCover";
  import BScroll from "better-scroll"; //导入Better scroll核心  // 从路由传参获取当前页面漫画的id
  //数据请求---------------------------------
  let route = useRoute();
  let { id }: { id?: string } = route.query;
  let res = ref<any>({});
  let getData = async () => {
    res.value = await getComicDetail(id!);
  };
  getData();
  // Better scroll实例化相关------------------
  let comicCover = ref<object>({});
  let bs: { value: object } = ref({});
  onMounted(() => {
    // 挂载后获取原生dom对象,进行bs初始化
    bs.value = new BScroll(comicCover.value as HTMLElement, {
      click: true,
    });
  });
</script>
<template>
  <div ref="comicCover" class="comicCover w-100 h-100 noScrollBar">
    <!-- 滚动内容 -->
    <div style="min-height: 105vh">
      <!-- 漫画封面 -->
      <div class="mx-auto rounded-3" style="width: 80%">
        <img :src="res.data?.vertical_cover" class="w-100" />
      </div>
    </div>
    <!-- 头部返回按钮 -->
    <div class="ps-3 position-fixed top-0 w-100">
      <i class="bi bi-arrow-left-short"></i>
    </div>
  </div>
</template>

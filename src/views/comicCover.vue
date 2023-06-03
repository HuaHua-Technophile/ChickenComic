<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { getComicDetail } from "@/api/comicCover";
  import BScroll from "better-scroll"; //导入Better scroll核心  // 从路由传参获取当前页面漫画的id
  import { useGlobalStore } from "@/stores/counter";
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
  //------主题色-------
  let GlobalStore = useGlobalStore();
</script>
<template>
  <div ref="comicCover" class="comicCover w-100 h-100 noScrollBar">
    <!-- 滚动内容 -->
    <div style="min-height: 101vh; padding-top: 67.5px" :class="{}">
      <!-- 漫画封面 -->
      <div
        class="mx-auto mb-5 rounded-5 overflow-hidden"
        style="width: 70%; box-shadow: 0px 0px 30px rgba(255, 255, 255, 0.5)">
        <img :src="res.data?.vertical_cover" class="w-100" />
      </div>
      <!-- 下方内容区域 -->
      <div
        style="min-height: 80vh"
        :class="[
          { darkBg: GlobalStore.theme == 'dark' },
          { lightBg: GlobalStore.theme == 'light' },
        ]"
        class="rounded-5">
        <!-- 主要信息 -->
        <div class="position-relative d-flex align-items-center pt-5 mb-4">
          <!-- 收藏按钮 -->
          <div
            class="position-absolute top-0 translate-middle-y bg- d-flex align-items-center justify-content-center bg-light rounded-3"
            style="width: 10vw; height: 10vw; right: 10%">
            <i class="bi bi-heart text-danger fs-3 t-shadow-2"></i>
          </div>
          <!-- 图 -->
          <div
            class="ms-5 me-4 w-25 position-relative rounded-4 overflow-hidden"
            style="padding-bottom: 25%">
            <div class="position-absolute top-0 bottom-0 start-0 end-0">
              <img
                :src="res.data?.horizontal_cover"
                class="w-100 h-100 object-fit-cover" />
            </div>
          </div>
          <!-- 作者,漫画名 -->
          <div class="t-shadow-3">
            <div class="mb-2 opacity-50">
              人気しすー : {{ res.data?.interact_value }}
            </div>
            <div class="fs-2 fw-bold mb-1" style="letter-spacing: 2.5px">
              {{ res.data?.title }}
            </div>
            <div>
              <span class="opacity-75">絵師 : </span>
              <span class="fs-5">{{ res.data?.author_name[0] }}</span>
            </div>
          </div>
        </div>
        <!-- 介绍 -->
        <div class="ms-3 me-3 t-shadow-3 mb-3">
          <div class="fs-5 mb-2 d-flex align-items-center">
            <span>漫畫のあらすじ</span>
            <i class="bi bi-chevron-down fs-7 ms-3"></i>
          </div>
          <div class="opacity-50">{{ res.data?.evaluate }}</div>
        </div>
        <!-- 开始阅读/加入书架 -->
        <div class="d-flex align-items-center justify-content-evenly">
          <div
            class="pt-3 pb-3 fs-5 fw-bold bg-primary rounded-4 text-center t-shadow-5 bg-opacity-25"
            style="width: 40%">
            読み始めます
          </div>
          <div
            class="pt-3 pb-3 fs-5 fw-bold bg-secondary rounded-4 text-center t-shadow-5 bg-opacity-25"
            style="width: 40%">
            本棚に入れます
          </div>
        </div>
      </div>
    </div>
    <!-- 头部返回按钮 -->
    <div class="ps-3 position-fixed top-0 w-100 text-light t-shadow-3">
      <i class="bi bi-arrow-left-short"></i>
    </div>
    <!-- 背景 -->
    <div
      class="w-100 h-100 position-fixed top-0 z-n1"
      :style="`background: url(${res.data?.vertical_cover}) center/cover;`">
      <!-- 暗色遮罩层 -->
      <div
        class="position-absolute top-0 w-100 h-100 bg-dark bg-opacity-75"></div>
      <!-- 毛玻璃层 -->
      <div class="position-absolute top-0 w-100 h-100 blur-5"></div>
    </div>
  </div>
</template>

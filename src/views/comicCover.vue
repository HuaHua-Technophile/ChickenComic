<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { getComicDetail } from "@/api/comicCover";
  import BScroll from "better-scroll"; //导入Better scroll核心  // 从路由传参获取当前页面漫画的id
  import ObserveImage from "@better-scroll/observe-image"; //导入自动重新计算Better scroll
  import NestedScroll from "@better-scroll/nested-scroll"; //导入betterscroll嵌套
  import { useGlobalStore } from "@/stores/counter";
  import chapterComponent from "@/components/chapterComponent.vue"; //引入组件
  //数据请求---------------------------------
  let route = useRoute();
  let { id }: { id?: string } = route.query;
  let res = ref<any>({});
  let chapterList: Array<number> = [];
  let getData = async () => {
    res.value = await getComicDetail(id!);
    chapterList = res.value.data?.ep_list;
  };
  getData();

  // Better scroll实例化相关------------------
  BScroll.use(ObserveImage);
  BScroll.use(NestedScroll);
  let comicCover = ref<HTMLElement | object>({}); //待实例化的DOM元素
  let chapterComponentDom = ref<any>({}); //待实例化的DOM元素
  let bs: any = ref({});
  let bs2: any = ref({});
  onMounted(() => {
    // 挂载后获取原生dom对象,进行bs初始化
    bs.value = new BScroll(comicCover.value as HTMLElement, {
      click: true,
      observeImage: {
        debounceTime: 500, // ms
      },
      nestedScroll: {
        groupId: 1, // string or number
      },
    });
    bs2.value = new BScroll(chapterComponentDom.value.$el, {
      click: true,
      observeImage: {
        debounceTime: 500, // ms
      },
      nestedScroll: {
        groupId: 1, // string or number
      },
    });
  });
  //------主题色-------
  let GlobalStore = useGlobalStore();
  //子组件点击传出方法,阅读不同章节
  let router = useRouter();
  let readThisChapter = (index: number) => {
    let params = JSON.stringify({
      index,
      chapterList,
    });
    router.push({ name: "content", state: { params } }); //注意：此处一定要用params
  };
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
        :class="[
          { darkBg: GlobalStore.theme == 'dark' },
          { lightBg: GlobalStore.theme == 'light' },
        ]"
        class="rounded-top-5">
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
                v-lazy="res.data?.horizontal_cover"
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
        <div class="d-flex align-items-center justify-content-evenly mb-3">
          <div
            class="pt-3 pb-3 fs-5 fw-bold bg-primary rounded-4 text-center t-shadow-3 bg-opacity-25 insetShadow"
            style="width: 40%"
            @click="readThisChapter(0)">
            読み始めます
          </div>
          <div
            class="pt-3 pb-3 fs-5 fw-bold bg-secondary rounded-4 text-center t-shadow-3 bg-opacity-25 insetShadow"
            style="width: 40%">
            本棚に入れます
          </div>
        </div>
        <!-- 标签 -->
        <div
          class="d-flex align-items-center flex-wrap ps-3 pe-3 mb-3 opacity-75">
          <div class="me-3 t-shadow-3">ラベル :</div>
          <div
            v-for="item in res.data?.story_elems"
            class="bg-body-tertiary rounded me-3 pt-1 pb-1 ps-3 pe-3">
            {{ item.name }}
          </div>
        </div>
        <!-- 章节 -->
        <div class="ms-3 me-3 mb-3">
          <span class="fs-3 me-3">全{{ res.data?.ep_list.length }}ページ</span>
          <span class="opacity-75"
            >毎週{{ res.data?.renewal_time.slice(2, -2) }}日に更新です!</span
          >
        </div>
        <chapterComponent
          :detailList="res.data?.ep_list"
          class="ms-3 me-3"
          @readThisChapter="readThisChapter"
          ref="chapterComponentDom"></chapterComponent>
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
<style lang="scss">
  .insetShadow {
    box-shadow: inset 0px 0px 4px rgba(255, 255, 255, 0.4);
  }
</style>

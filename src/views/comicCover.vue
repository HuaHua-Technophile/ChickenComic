<script setup lang="ts">
  import { ref, onMounted, watchEffect } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import chapterComponent from "@/components/chapterComponent.vue"; //引入组件
  import { useThemeStore } from "@/stores/theme";
  import { useUserInfoStore } from "@/stores/userInfo";
  import { storeToRefs } from "pinia";
  import { getComicDetail } from "@/api/comicCover";
  import BScroll from "better-scroll"; //导入Better scroll核心  // 从路由传参获取当前页面漫画的id
  import ObserveImage from "@better-scroll/observe-image"; //导入自动重新计算Better scroll
  import ObserveDOM from "@better-scroll/observe-dom"; //同上
  import NestedScroll from "@better-scroll/nested-scroll"; //导入betterscroll嵌套
  import { showToast } from "vant";
  import "vant/es/toast/style";
  //---------------------主题-----------------------
  const { theme } = useThemeStore();
  let router = useRouter();
  //----------------定义字符串替换方法----------------
  let updateTime = (str: string) => {
    str = str
      .replace("卷", "いつでも")
      .replace("每周", "毎週")
      .replace("更新", "更新します");
    return str;
  };
  //------------------数据请求-----------------------
  let route = useRoute();
  let { id } = route.query;
  let res = ref();
  let chapterList: Array<object> = [];
  let getData = async () => {
    res.value = await getComicDetail(id + "");
    chapterList = res.value.data?.ep_list; //章节列表
  };
  getData();
  // ----------------Better scroll配置项相关---------------
  BScroll.use(ObserveImage);
  BScroll.use(ObserveDOM);
  BScroll.use(NestedScroll);
  let comicCover = ref(); //待实例化的DOM元素
  let chapterComponentDom = ref(); //待实例化的DOM元素
  let bs = ref();
  let bs2 = ref();
  //-------------挂载后获取原生dom对象,进行bs初始化---------
  onMounted(() => {
    if (comicCover.value) {
      bs.value = new BScroll(comicCover.value, {
        click: true,
        observeDOM: true, // 开启 observe-dom 插件
        observeImage: {
          debounceTime: 500, // ms
        },
        nestedScroll: {
          groupId: 1, // string or number
        },
      });
    }
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
  //------------------------收藏相关/pinia判断是否已登录/历史阅读-------------------------
  let { userInfo, Logged } = storeToRefs(useUserInfoStore());
  let isCollection = ref<boolean | undefined>(false);
  watchEffect(() => {
    isCollection.value = userInfo?.value?.collection!.some(
      (i) => i.id == route.query.id
    );
  });
  let collect = (status: boolean) => {
    if (Logged && Logged.value) {
      if (isCollection.value) {
        if (status) showToast("収蔵済みです");
        else {
          let index = userInfo?.value?.collection!.findIndex(
            (i) => i.id == route.query.id
          );
          userInfo?.value?.collection!.splice(index as number, 1);
          showToast("好きを取り消す");
        }
      } else {
        userInfo.value?.collection!.push(res.value.data);
        showToast("コレクション成功です");
      }
    } else {
      showToast("未登録です");
      router.push({ name: "login" });
    }
  };
  //------------------子组件点击传出方法,阅读不同章节------------------
  let readThisChapter = (index: number) => {
    if (index == -1) {
      index = res.value?.data.ep_list.length - 1;
      userInfo.value?.watchingHistory?.forEach((i) => {
        if (i.data.id == res.value.data.id) index = i.index;
      });
    }
    let params = JSON.stringify({
      index,
      data: res.value?.data,
    });
    router.push({ name: "content", state: { params } }); //注意：此处一定要用params
  };
</script>
<template>
  <div ref="comicCover" class="comicCover w-100 h-100 noScrollBar">
    <!-- 滚动内容 -->
    <div style="min-height: 101vh; padding-top: 67.5px">
      <!-- 漫画封面 -->
      <div
        class="mx-auto mb-5 rounded-5 overflow-hidden"
        style="width: 70%; box-shadow: 0px 0px 30px rgba(255, 255, 255, 0.5)">
        <img v-lazy="res?.data.vertical_cover + '@386w'" class="w-100" />
      </div>
      <!-- 下方内容区域 -->
      <div
        :class="[{ darkBg: theme == 'dark' }, { lightBg: theme == 'light' }]"
        class="rounded-top-5 position-relative">
        <!-- 收藏按钮 -->
        <div
          class="position-absolute top-0 translate-middle-y d-flex align-items-center justify-content-center bg-light rounded-3"
          style="width: 10vw; height: 10vw; right: 10%"
          @click="collect(false)">
          <i
            class="bi text-danger fs-3"
            :class="isCollection ? 'bi-heart-fill' : 'bi-heart'"
            style="text-shadow: 1.5px 1.5px 3px rgba(0, 0, 0, 0.5)"></i>
        </div>
        <!-- 主要信息 -->
        <div class="d-flex align-items-center pt-5 mb-4">
          <!-- 图 -->
          <div
            class="ms-4 me-4 w-25 position-relative rounded-4 overflow-hidden flex-shrink-0"
            style="padding-bottom: 25%; box-shadow: 0 0 3px rgba(0, 0, 0, 0.8)">
            <div class="position-absolute top-0 bottom-0 start-0 end-0">
              <img
                v-lazy="res?.data.horizontal_cover + '@105h'"
                class="w-100 h-100 object-fit-cover" />
            </div>
          </div>
          <!-- 作者,漫画名 -->
          <div class="flex-grow-1 overflow">
            <div class="mb-2 opacity-50">
              人気しすー : {{ res?.data.interact_value }}
            </div>
            <div
              class="fs-2 fw-bold mb-1 van-multi-ellipsis--l2 t-shadow-2"
              style="letter-spacing: 2.5px">
              {{ res?.data.title }}
            </div>
            <div class="pe-3">
              <span class="fs-7 opacity-75">絵師 : </span>
              <span>
                <span
                  v-for="(item, index) in res?.data.author_name"
                  :key="index"
                  >{{ item
                  }}<span
                    class="opacity-50"
                    v-if="index < res?.data.author_name.length - 1"
                    >│</span
                  ></span
                >
              </span>
            </div>
          </div>
        </div>
        <!-- 介绍 -->
        <div class="ms-3 me-3 mb-3">
          <div class="fs-5 mb-2 d-flex align-items-center">
            <span>漫畫のあらすじ</span>
            <i class="bi bi-chevron-down fs-7 ms-3"></i>
          </div>
          <div class="opacity-50">{{ res?.data.evaluate }}</div>
        </div>
        <!-- 开始阅读/加入书架 -->
        <div class="d-flex align-items-center justify-content-evenly mb-3">
          <div
            class="pt-3 pb-3 fs-5 fw-bold bg-primary rounded-4 text-center t-shadow-3 bg-opacity-25 insetShadow-4-4"
            style="width: 40%"
            @click="readThisChapter(-1)">
            読み始めます
          </div>
          <div
            class="pt-3 pb-3 fs-5 fw-bold bg-secondary rounded-4 text-center t-shadow-3 bg-opacity-25 insetShadow-4-4"
            style="width: 40%"
            @click="collect(true)">
            納めます
          </div>
        </div>
        <!-- 标签 -->
        <div
          class="d-flex align-items-center flex-wrap ps-3 pe-3 mb-3 opacity-75">
          <div class="mb-3">ラベル :</div>
          <div
            v-for="item in res?.data.story_elems"
            class="bg-body-tertiary bg-opacity-50 rounded mb-3 mx-1 py-1 px-3 insetShadow-1-3">
            {{ item.name }}
          </div>
        </div>
        <!-- 章节 -->
        <div class="ms-3 me-3 mb-3">
          <span class="fs-3 me-3">全{{ res?.data.ep_list.length }}ページ</span>
          <span class="opacity-75" v-if="res?.data.renewal_time">{{
            updateTime(res?.data.renewal_time)
          }}</span>
        </div>
        <chapterComponent
          :detailList="res?.data.ep_list"
          class="ms-3 me-3"
          @readThisChapter="readThisChapter"
          ref="chapterComponentDom"></chapterComponent>
      </div>
    </div>
    <!-- 头部返回按钮 -->
    <back-component class="position-fixed"></back-component>
    <!-- 背景 -->
    <div class="w-100 h-100 position-fixed top-0 z-n1">
      <img
        :src="res?.data.vertical_cover + '@386w'"
        class="w-100 h-100 object-fit-cover" />
      <!-- 暗色遮罩层 -->
      <div
        class="position-absolute top-0 w-100 h-100 bg-dark bg-opacity-75"></div>
      <!-- 毛玻璃层 -->
      <div class="position-absolute top-0 w-100 h-100 blur-5"></div>
    </div>
  </div>
</template>

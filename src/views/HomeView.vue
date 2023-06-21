<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import UserSetting from "@/components/UserSetting.vue";
  import SearchBar from "@/components/SearchBar.vue";
  import RankingBar from "@/components/RankingBar.vue";
  import RecommendBar from "@/components/RecommendBar.vue";
  import { storeToRefs } from "pinia";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import ObserveDOM from "@better-scroll/observe-dom"; //dom变化自动重新实例化
  import ObserveImage from "@better-scroll/observe-image";
  import { useUserInfoStore } from "@/stores/userInfo";
  import { getRankInfo } from "@/api/ranking";
  import { getRecommend } from "../api/Recommended"; //获取3条推荐漫画数据
  import { getAllLabel } from "@/api/category"; //获取分类选项
  import { type comicInfoCommonType } from "@/utils/typeing";
  // ---------用户信息-------------
  let { userInfo, Logged } = storeToRefs(useUserInfoStore());
  let userId = localStorage.getItem("userId");
  if (userId) {
    Logged.value = true;
    userInfo.value = JSON.parse(localStorage.getItem(`user${userId}`) + "");
  }
  //------------------------ bscroll实例化函数----------------------------
  let home = ref();
  let bs = ref();
  BScroll.use(ObserveImage);
  BScroll.use(ObserveDOM); // 自动重载插件
  const bsMounted = () => {
    // 实例化bscroll并配置其配置项
    bs.value = new BScroll(home.value, {
      click: true,
      observeDOM: true,
      observeImage: true, // 开启 observe-image 插件
    });
  };
  // --------------------------请求新作榜数据----------------------------------
  let newComicRankInfoData = ref<{
    data?: { list: Array<comicInfoCommonType> };
  }>({});
  const getNewComicRankInfo = async () => {
    newComicRankInfoData.value = await getRankInfo({
      id: "7",
      offset: "0",
      subId: "0",
    });
  };
  getNewComicRankInfo(); // 请求新作排行榜数据
  onMounted(() => {
    bsMounted();
  });
  //------------------------请求推荐模块---------------------------
  let RecommendList = ref<
    Array<{ season_id: number; horizontal_cover: string }>
  >([]);
  const getRecommendFun = async () => {
    let res = await getRecommend();
    RecommendList.value = res.data;
    console.log(RecommendList.value);
  };
  getRecommendFun(); // 请求推荐数据
  // -----------------请求分类选项数据--------------
  let classificationList = ref();
  let AllLabelLoad = async () => {
    let AllLabel = await getAllLabel();
    classificationList.value = AllLabel.data;
  };
  AllLabelLoad();
  const itemBg = new URL("./img/itemBg.png", import.meta.url).href;
  let bgStyle = {
    backgroundImage: itemBg + "",
    // 不能完全使用变量，前置地址必须是静态地址，否则会报错
    backgroundSize: "100%",
  }; //样式
</script>
<template>
  <div class="home w-100 h-100" ref="home">
    <!-- 滚动内容 -->
    <div style="min-height: calc(100% + 1px)" class="overflow-hidden">
      <!-- 用户信息/设置 -->
      <UserSetting :userInfo="userInfo" :userId="userId"></UserSetting>
      <!-- 搜索区域 -->
      <SearchBar></SearchBar>
      <!-- 首页排行榜 -->
      <RankingBar :newComicRankInfoData="newComicRankInfoData"></RankingBar>
      <!-- 首页轮播图推荐模块 -->
      <RecommendBar :RecommendList="RecommendList"></RecommendBar>
      <!-- 首页分类,不需要传值,无其余场景复用,不使用组件 -->
      <div class="mt-4">
        <!-- 标题 -->
        <div
          class="titleArea px-4 d-flex justify-content-between align-items-end">
          <!-- 左侧标题 -->
          <div class="title fs-4">カテゴリー</div>
          <!-- 查看更多 -->
          <div
            class="more fs-6 opacity-50"
            @click="$router.push({ name: 'ComicClassification' })">
            <span class="moreTitle">もっと調べます</span>
            <i class="bi bi-chevron-right" style="margin-left: 5px"></i>
          </div>
        </div>
        <!-- 分类选项 -->
        <swiper-container
          class="mySwiper mt-3 px-3"
          slides-per-view="auto"
          space-between="30"
          free-mode="true">
          <swiper-slide
            v-for="(item, index) in classificationList?.styles"
            :key="index"
            class="d-flex align-items-center justify-content-center"
            style="width: 80px">
            <div style="height: 80px; width: 80px" :style="bgStyle">
              <img src="../img/itemBg.png" class="w-100 h-100" />
              <span
                class="position-absolute top-50 start-50 translate-middle text-nowrap fw-bold"
                >{{ item.name }}</span
              >
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

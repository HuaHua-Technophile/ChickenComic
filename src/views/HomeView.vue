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
  import { type comicInfoCommonType } from "@/utils/typeing";
  // ---------用户信息-------------
  let { userInfo, Logged } = storeToRefs(useUserInfoStore());
  let userId = localStorage.getItem("userId");
  if (userId) {
    Logged.value = true;
    userInfo.value = JSON.parse(localStorage.getItem(`user${userId}`) + "");
  }
  //------------------------ bscroll实例化函数----------------------------
  const home = ref();
  const bs = ref();
  BScroll.use(ObserveImage);
  BScroll.use(ObserveDOM); // 自动重载插件
  const bsMounted = () => {
    // 实例化bscroll并配置其配置项
    bs.value = new BScroll(home.value as HTMLElement, {
      click: true,
      observeDOM: true,
      observeImage: true,
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
  //---------------------请求推荐模块------------------------------
  let RecommendList = ref<Array<{ season_id: number; vertical_cover: string }>>(
    []
  );
  const getRecommendFun = async () => {
    let res = await getRecommend();
    RecommendList.value = res.data;
    console.log(RecommendList.value);
  };
  getRecommendFun(); // 请求推荐数据
</script>
<template>
  <div class="home w-100 h-100" ref="home">
    <!-- 滚动内容 -->
    <div style="min-height: calc(100% + 1px)">
      <!-- 用户信息/设置 -->
      <UserSetting :userInfo="userInfo" :userId="userId"></UserSetting>
      <!-- 搜索区域 -->
      <SearchBar></SearchBar>
      <!-- 首页排行榜 -->
      <RankingBar :newComicRankInfoData="newComicRankInfoData"></RankingBar>
      <!-- 首页轮播图推荐模块 -->
      <RecommendBar :RecommendList="RecommendList"></RecommendBar>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

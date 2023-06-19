<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import UserSetting from "@/components/UserSetting.vue";
  import SearchBar from "@/components/SearchBar.vue";
  import RankingBar from "@/components/RankingBar.vue";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import ObserveDOM from "@better-scroll/observe-dom";
  import { useUserInfoStore } from "@/stores/userInfo";
  import { storeToRefs } from "pinia";
  import { getRankInfo } from "@/api/ranking";
  import { type comicInfoCommonType } from "@/utils/typeing";

  // 首页ts接口
  interface newComicRankInfoDataType {
    data?: { list: Array<comicInfoCommonType> };
  }

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
  BScroll.use(ObserveDOM); // 自动重载插件
  const bsMounted = () => {
    // 实例化bscroll并配置其配置项
    bs.value = new BScroll(home.value as HTMLElement, {
      click: true,
      observeDOM: true,
    });
  };

  // 请求新作榜数据封装函数
  let newComicRankInfoData = ref<newComicRankInfoDataType>({});
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
</script>

<template>
  <div class="home w-100 h-100" ref="home">
    <!-- 滚动内容 -->
    <div style="min-height: calc(100% + 1px)">
      <!-- 用户信息/设置 -->
      <UserSetting :userInfo="userInfo" :userId="userId"></UserSetting>
      <!-- 搜索区域 -->
      <SearchBar></SearchBar>
      <!-- 排行榜 -->
      <RankingBar :newComicRankInfoData="newComicRankInfoData"></RankingBar>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

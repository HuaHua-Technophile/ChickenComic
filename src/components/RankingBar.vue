<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { register } from "swiper/element/bundle";
  import { type comicInfoCommonType } from "@/utils/typeing";

  const router = useRouter();

  // 排行榜组件ts接口
  interface newComicRankInfoDataType {
    data?: { list: Array<comicInfoCommonType> };
  }

  // -----------------注册swiper-------------------------
  register();

  // --------------swiper实例化-----------------
  const sw1 = ref();

  // 接收父组件传值
  defineProps<{
    newComicRankInfoData: newComicRankInfoDataType;
  }>();

  // 跳转到排行榜页
  const toRanking = () => {
    router.push("ranking");
  };
  // 跳转到相应漫画详情页
  const toComicDetail = (id: number) => {
    router.push({ name: "comicCover", query: { id } });
  };
</script>

<template>
  <div class="rankingTo mt-4 overflow-hidden">
    <!-- 标题 -->
    <div class="titleArea px-4 d-flex justify-content-between align-items-end">
      <!-- 左侧标题 -->
      <div class="title fs-4">ランキング</div>
      <!-- 查看更多 -->
      <div class="more fs-6 opacity-50" @click="toRanking">
        <span class="moreTitle">もっと調べます</span>
        <i class="bi bi-chevron-right" style="margin-left: 5px"></i>
      </div>
    </div>
    <!-- 排行榜item区域 -->
    <div
      class="rankingScroll mt-3"
      ref="rankingScroll"
      style="width: 100%; height: 240px">
      <!-- swiper -->
      <swiper-container
        class="rankingSwiper px-4"
        ref="sw1"
        events-prefix="swiperFirstBox-"
        slides-per-view="auto"
        free-mode="true"
        space-between="25"
        style="padding-top: 5px">
        <swiper-slide
          v-for="(item, index) in newComicRankInfoData?.data?.list.slice(0, 10)"
          :key="index"
          style="width: 130px; height: 100%">
          <div class="item" @click="toComicDetail(item.comic_id)">
            <div class="imageItemBox" style="width: 100%">
              <img
                class="imageItem rounded-4"
                style="
                  width: 100%;
                  box-shadow: 0px 0px 5px rgba(var(--bs-body-color-rgb), 0.5);
                "
                v-lazy="item.vertical_cover + '@568w_319h'"
                alt="" />
            </div>
            <div class="comicTitle text-truncate fs-6 pt-1">
              {{ item?.title }}
            </div>
            <!-- 跟新或完结信息 -->
            <div
              class="fs-7 opacity-50"
              v-show="!item?.is_finish && item?.last_ord">
              {{ item?.last_ord }}話に更新
            </div>
            <div class="fs-7 opacity-50" v-show="item.is_finish">
              [完結]
              <span v-if="item?.last_ord">全{{ item?.last_ord }}話</span>
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  img[lazy="loading"] {
    opacity: 0;
  }
  img[lazy="loading"]:not([class^="notWidthTransition"]) {
    width: 97px !important;
  }
  img[lazy="error"] {
    opacity: 1;
    transition: 0.6s;
  }
  img[lazy="loaded"] {
    opacity: 1;
    transition: 0.6s;
  }
</style>

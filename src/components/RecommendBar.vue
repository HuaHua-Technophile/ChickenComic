<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { register } from "swiper/element/bundle";

  const router = useRouter();

  // -----------------注册swiper-------------------------
  register();

  // --------------swiper实例化-----------------
  const sw1 = ref();

  // 接收父组件参数
  defineProps<{
    RecommendList: Array<{ season_id: number; horizontal_cover: string }>;
  }>();

  // 跳转到排行榜页
  const toRecommendedComics = () => {
    router.push("RecommendedComics");
  };
  // 跳转到相应漫画详情页
  const toComicDetail = (id: number) => {
    router.push({ name: "comicCover", query: { id } });
  };
</script>

<template>
  <div class="recommendTo mt-4 overflow-hidden">
    <!-- 标题 -->
    <div class="titleArea px-4 d-flex justify-content-between align-items-end">
      <!-- 左侧标题 -->
      <div class="title fs-4">推薦作品</div>
      <!-- 查看更多 -->
      <div class="more fs-6 opacity-50" @click="toRecommendedComics">
        <span class="moreTitle">推奨事項</span>
        <i class="bi bi-chevron-right" style="margin-left: 5px"></i>
      </div>
    </div>
    <!-- 推荐item区域 -->
    <div
      class="recommendScroll mt-3 mx-auto"
      ref="recommendScroll"
      style="width: 350px">
      <!-- swiper -->
      <swiper-container
        class="recommendSwiper px-4"
        ref="sw1"
        events-prefix="swiperFirstBox-"
        effect="cards"
        style="padding-top: 5px">
        <swiper-slide
          class="rounded-4"
          v-for="(item, index) in RecommendList"
          :key="index"
          style="
            width: 100%;
            height: 100%;
            box-shadow: 0px 0px 5px rgba(var(--bs-body-color-rgb), 0.5);
          ">
          <div class="item" @click="toComicDetail(item.season_id)">
            <div class="imageItemBox" style="width: 100%">
              <img
                class="imageItem rounded-4"
                style="width: 100%"
                v-lazy="item.horizontal_cover + '@568w_319h'"
                alt="" />
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
    opacity: 0;
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

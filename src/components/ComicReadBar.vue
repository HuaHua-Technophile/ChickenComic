<script setup lang="ts">
  import { ref } from "vue";
  import { useNowListStore } from "@/stores/nowList";
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";

  const router = useRouter();

  // 解构出当前正在阅读的章节数据
  let { nowComicList, nowIndex, nowListLength } = storeToRefs(
    useNowListStore()
  );

  // 跳转到当前阅读页
  const toRead = (index: number) => {
    if (nowComicList.value) {
      let params = JSON.stringify({
        index,
        title: nowComicList.value.title,
        square_cover: nowComicList.value.square_cover,
        chapterList: nowComicList.value.chapterList,
      });
      router.push({ name: "content", state: { params } }); //注意：此处一定要用params
    }
  };

  // 控制悬浮条伸缩
  let ComicReadBar = ref();
  const changeWidth = () => {
    ComicReadBar.value.style.width =
      ComicReadBar.value.style.width == "90%" ? "65px" : "90%";
    ComicReadBar.value.style.right =
      ComicReadBar.value.style.width == "65px" ? "10%" : "50%";
  };
</script>

<template>
  <div
    class="ComicReadBar rounded-pill blur-5 position-fixed z-3 d-flex px-2 align-items-center overflow-hidden"
    style="
      width: 65px;
      height: 65px;
      right: 10%;
      bottom: 2%;
      transform: translateX(50%);
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
      transition: all 0.8s;
    "
    ref="ComicReadBar"
    @click="toRead(nowIndex)">
    <div
      class="comicListCover flex-shrink-0"
      style="width: 49px; height: 49px"
      @click.stop="changeWidth">
      <img
        v-show="nowComicList"
        style="width: 100%; height: 100%; border-radius: 50%"
        v-lazy="nowComicList?.square_cover + '@568w_319h'"
        alt="" />
      <img
        v-show="!nowComicList"
        style="width: 100%; height: 100%; border-radius: 50%"
        src="../img//EqEgKAXC_400x400.png"
        alt="" />
    </div>
    <div
      class="comicListMsg flex-grow-1 text-truncate"
      style="margin-left: 10px">
      <div class="comicName text-truncate fs-6" v-show="nowComicList">
        {{ nowComicList?.title }}
      </div>
      <div class="comicName text-truncate fs-6" v-show="!nowComicList">
        読み取りなし
      </div>
      <div class="listName text-truncate fs-7 opacity-50" v-show="nowComicList">
        第{{ nowListLength - nowIndex }}話
      </div>
    </div>
    <div
      class="toComicList flex-shrink-0 fs-1 text-center"
      style="width: 50px; height: 50px; line-height: 50px">
      <i class="bi bi-play-fill"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  img[lazy="loading"] {
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

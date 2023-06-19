<script setup lang="ts">
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
    let params = JSON.stringify({
      index,
      title: nowComicList.value.title,
      square_cover: nowComicList.value.square_cover,
      chapterList: nowComicList.value.chapterList,
    });
    router.push({ name: "content", state: { params } }); //注意：此处一定要用params
  };
</script>

<template>
  <div
    class="ComicReadBar rounded-pill blur-5 position-fixed start-50 z-3 d-flex px-2 align-items-center"
    style="
      width: 90%;
      height: 65px;
      bottom: 2%;
      transform: translateX(-50%);
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
    "
    @click="toRead(nowIndex)">
    <div class="comicListCover flex-shrink-0" style="width: 50px; height: 50px">
      <img
        style="width: 100%; height: 100%; border-radius: 50%"
        :src="nowComicList?.square_cover + '@568w_319h'"
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

<style lang="scss"></style>

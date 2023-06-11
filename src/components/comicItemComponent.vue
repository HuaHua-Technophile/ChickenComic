<script setup lang="ts">
  import { useRouter } from "vue-router";

  // 调用导入的useRouter
  const router = useRouter();

  const props = defineProps<{
    comicList: {
      comic_id: number;
      title: string;
      author: string[];
      styles: any;
      is_finish: number;
      last_ord: any;
      vertical_cover: string;
      type: object;
      default: () => {};
    };
  }>();

  // 跳转到相应漫画详情页
  const toComicDetail = (): void => {
    router.push({
      name: "comicCover",
      query: { id: props.comicList.comic_id },
    });
  };
</script>

<template>
  <div
    class="comicItem d-flex flex-grow-1"
    style="width: 100%; height: 120px"
    @click="toComicDetail">
    <!-- 封面 -->
    <div class="comicImage" style="width: 80px">
      <img
        class="rounded-3"
        v-lazy="comicList?.vertical_cover + '@568w_319h'"
        style="width: 80px; box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.5)"
        alt="" />
    </div>
    <!-- 右侧文本区域 -->
    <div
      class="textArea overflow-hidden flex-grow-1 text-truncate d-flex flex-column justify-content-between"
      style="width: 150px; padding-left: 10px">
      <!-- 漫画名 -->
      <div class="title text-truncate fs-7">
        {{ comicList?.title }}
      </div>
      <!-- 下方漫画信息区域 -->
      <div class="msg" style="color: rgba(232, 232, 232, 0.5)">
        <!-- 作者信息 -->
        <div class="authorArea fs-9 text-truncate">
          <span
            class="author"
            style="padding-right: 5px"
            v-for="(authorItem, auInd) in comicList?.author"
            :key="auInd"
            >{{ authorItem }}</span
          >
        </div>
        <!-- 作品风格 -->
        <div class="comicType fs-9">
          <span>{{ comicList?.styles[0]?.name }}</span>
        </div>
        <!-- 跟新或完结信息 -->
        <div class="updateItem fs-9" v-show="!comicList?.is_finish">
          <span>更新至第{{ comicList?.last_ord }}話</span>
        </div>
        <div class="endItem fs-9" v-show="comicList.is_finish">
          <span>[完结]共{{ comicList?.last_ord }}話</span>
        </div>
        <!-- 底部占位 -->
        <div class="aitem" style="height: 15px"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>

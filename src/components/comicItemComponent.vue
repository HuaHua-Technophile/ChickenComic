<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { type comicInfoCommonType } from "@/utils/typeing";
  // ---------------设备像素比----------------
  let DPR = window.devicePixelRatio;
  // 调用导入的useRouter
  const router = useRouter();
  const props = defineProps<{
    comicInfo: comicInfoCommonType;
    imgWidth: number;
    fontSize?: number;
  }>();
  // 跳转到相应漫画详情页
  const toComicDetail = () => {
    let id = props.comicInfo.comic_id
      ? props.comicInfo.comic_id
      : props.comicInfo.id != 0
      ? props.comicInfo.id
      : props.comicInfo.wiki.id;
    router.push({
      name: "comicCover",
      query: { id },
    });
  };
</script>
<template>
  <div
    class="w-100 h-100 d-flex flex-grow-1 overflow-hidden position-relative"
    style="padding: 5px 0"
    @click="toComicDetail">
    <!-- 封面 -->
    <img
      class="rounded-3 flex-shrink-0"
      v-lazy="
        `${
          comicInfo?.vertical_cover != ''
            ? comicInfo?.vertical_cover
            : comicInfo?.wiki.vertical_cover
        }@${(props.imgWidth * DPR).toFixed()}w`
      "
      style="
        margin: 0 5px;
        box-shadow: 0px 0px 5px rgba(var(--bs-body-color-rgb), 0.5);
      " />
    <!-- 右侧文本区域 -->
    <div
      class="overflow-hidden flex-grow-1 d-flex flex-column justify-content-around">
      <!-- 漫画名 -->
      <div
        class="text-truncate"
        :style="{ fontSize: fontSize + 'px' }"
        v-html="
          comicInfo?.title != '' ? comicInfo?.title : comicInfo?.wiki.title
        "></div>
      <!-- 下方漫画信息区域 -->
      <div class="opacity-50" :style="{ fontSize: fontSize! * 0.8 + 'px' }">
        <!-- 作者信息 -->
        <div class="text-truncate">
          <!-- 多种数据适配 -->
          <span v-if="comicInfo?.author">
            <span
              style="padding-right: 5px"
              v-for="(item, index) in comicInfo?.author"
              :key="index"
              >{{ item }}</span
            >
          </span>
          <span v-if="comicInfo?.author_name">
            <span
              style="padding-right: 5px"
              v-for="(item, index) in comicInfo?.author_name"
              :key="index"
              >{{ item }}</span
            >
          </span>
        </div>
        <!-- 作品风格 -->
        <div>
          <span>{{ comicInfo?.styles[0]?.name || comicInfo?.styles[0] }}</span>
        </div>
        <!-- 跟新或完结信息 -->
        <div v-show="!comicInfo?.is_finish">
          <span v-if="comicInfo?.last_ord"
            >{{ comicInfo?.last_ord }}話に更新</span
          >
          <span v-else>[連載]</span>
        </div>
        <div v-show="comicInfo.is_finish">
          [完結]
          <span v-if="comicInfo?.last_ord">全{{ comicInfo?.last_ord }}話</span>
        </div>
        <!-- 等待免费看标签 -->
        <div
          v-if="comicInfo.allow_wait_free"
          class="position-absolute top-0 start-0 z-3 bg-danger rounded">
          無料
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  img[lazy="loading"] {
    opacity: 0;
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

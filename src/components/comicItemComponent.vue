<script setup lang="ts">
  import { useRouter } from "vue-router";
  // 调用导入的useRouter
  const router = useRouter();
  const props = defineProps<{
    comicInfo: {
      comic_id: number;
      title: string;
      author: string[];
      styles: Array<string | any>;
      is_finish: number;
      last_ord: number | string;
      vertical_cover: string;
      type: object;
      default: () => {};
    };
  }>();
  // 跳转到相应漫画详情页
  const toComicDetail = (): void => {
    router.push({
      name: "comicCover",
      query: { id: props.comicInfo.comic_id },
    });
  };
</script>
<template>
  <div class="w-100 h-100 d-flex flex-grow-1" @click="toComicDetail">
    <!-- 封面 -->
    <img
      class="rounded-3 flex-shrink-0"
      v-lazy="comicInfo?.vertical_cover + '@478w_638h'"
      style="box-shadow: 0px 0px 5px rgba(var(--bs-body-color-rgb), 0.5)" />
    <!-- 右侧文本区域 -->
    <div
      class="overflow-hidden flex-grow-1 d-flex flex-column justify-content-between">
      <!-- 漫画名 -->
      <div class="fs-7 van-multi-ellipsis--l2">
        {{ comicInfo?.title }}
      </div>
      <!-- 下方漫画信息区域 -->
      <div class="fs-9 opacity-50">
        <!-- 作者信息 -->
        <div class="text-truncate">
          <span
            style="padding-right: 5px"
            v-for="(authorItem, auInd) in comicInfo?.author"
            :key="auInd"
            >{{ authorItem }}</span
          >
        </div>
        <!-- 作品风格 -->
        <div>
          <span>{{ comicInfo?.styles[0]?.name || comicInfo?.styles[0] }}</span>
        </div>
        <!-- 跟新或完结信息 -->
        <div v-show="!comicInfo?.is_finish">
          {{ comicInfo?.last_ord }}話に更新
        </div>
        <div v-show="comicInfo.is_finish">
          [完結]全{{ comicInfo?.last_ord }}話
        </div>
      </div>
    </div>
  </div>
</template>

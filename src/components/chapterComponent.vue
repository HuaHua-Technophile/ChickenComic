<script setup>
  import { ref } from "vue";
  let props = defineProps({
    detailList: {
      type: Array,
      default: () => [],
    },
    maxHeight: {
      type: String,
      default: () => "80vh",
    },
    selectIndex: {
      type: Number,
    },
  });
</script>
<template>
  <div
    class="chapter-warrper overflow-hidden"
    :style="`max-height:${maxHeight}`">
    <div class="chapter-content" style="min-height: calc(100% + 1px)">
      <div
        v-for="(item, index) in detailList"
        :key="index"
        @click="$emit('readThisChapter', index)"
        class="mb-3 d-flex align-items-center">
        <!-- 封面 -->
        <div style="width: 40%" class="me-4">
          <img :src="item?.cover" class="w-100 rounded-3" />
        </div>
        <!-- 名称 -->
        <div class="flex-grow-1">
          <div
            class="fs-7"
            :class="selectIndex == index ? 'text-body' : 'text-body-tertiary'">
            バンドしま - {{ detailList.length - index }}
          </div>
          <div
            class="fs-5"
            :class="selectIndex == index ? 'text-body' : 'text-body-tertiary'">
            {{ item.title.replace(/第.*[话|章]/, "") }}
          </div>
          <div class="fs-8 text-body-tertiary">
            <span class="me-3">{{ item.pub_time.slice(2, 10) }}</span>
            <span
              >{{ item.like_count }}<i class="bi bi-hand-thumbs-up"></i>
            </span>
          </div>
        </div>
        <!-- 内含多少页漫画 -->
        <div class="fs-7 opacity-75">{{ item.comments }}畫</div>
      </div>
    </div>
  </div>
</template>

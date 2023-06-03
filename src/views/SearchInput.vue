<script setup lang="ts">
  import { ref } from "vue";
  import { showToast } from "vant";
  import { useGlobalStore } from "../stores/counter";
  const value = ref("");
  const onSearch = (val: any) => showToast(val);
  const onCancel = () => showToast("取消");

  let { theme, changeTheme }: any = useGlobalStore();
</script>

<template>
  <div ref="SearchInput" class="SearchInput w-100 h-100 noScrollBar">
    <!-- 搜索框 -->
    <div
      class="bg-body rounded-pill mt-3"
      :class="[theme === 'light' ? 'bg-opacity-75' : 'bg-opacity-50']">
      <form action="/">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          background="transparent"
          :shape="'round'"
          :class="[theme == 'dark' ? 'searchDark' : 'searchLight']" />
      </form>
    </div>
    <div class="searchHistory px-3">
      <div class="d-flex justify-content-between align-items-center">
        <p class="my-2">搜索历史</p>
        <i class="bi bi-trash3"></i>
      </div>
      <ul class="d-flex flex-wrap">
        <li
          class="bg-body px-3 py-2 rounded-pill fs-10 bg-opacity-75 me-2 mt-2">
          历史一
        </li>
        <li
          class="bg-body px-3 py-2 rounded-pill fs-10 bg-opacity-75 me-2 mt-2">
          历史一
        </li>
        <li
          class="bg-body px-3 py-2 rounded-pill fs-10 bg-opacity-75 me-2 mt-2">
          历史一
        </li>
        <li
          class="bg-body px-3 py-2 rounded-pill fs-10 bg-opacity-75 me-2 mt-2">
          历史一
        </li>
        <li
          class="bg-body px-3 py-2 rounded-pill fs-10 bg-opacity-75 me-2 mt-2">
          历史一
        </li>
        <li
          class="bg-body px-3 py-2 rounded-pill fs-10 bg-opacity-75 me-2 mt-2">
          历史一
        </li>
        <li
          class="bg-body px-3 py-2 rounded-pill fs-10 bg-opacity-75 me-2 mt-2">
          历史一
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss"></style>
<style lang="scss" scoped>
  .searchDark {
    --van-search-content-background: transparent;
    --van-field-input-text-color: rgb(254, 254, 254);
  }
  .searchLight {
    --van-search-content-background: transparent;
    --van-field-input-text-color: rgb(1, 1, 1);
  }
</style>

<script setup lang="ts">
  import { ref } from "vue";
  import { useGlobalStore } from "../stores/counter";
  //主题切换
  let { theme, changeTheme }: any = useGlobalStore();
  let keyWord = ref("我推的孩子");

  const value1 = ref(-1);
  const value2 = ref("a");
  const value3 = ref("A");
  const option1 = [
    { text: "默认排序", value: -1 },
    { text: "人气推荐", value: 0 },
    { text: "更新时间", value: 1 },
    { text: "上架时间", value: 2 },
  ];
  const option2 = [
    { text: "默认排序", value: "a" },
    { text: "好评排序", value: "b" },
    { text: "销量排序", value: "c" },
  ];
  const option3 = [
    { text: "33333", value: "A" },
    { text: "好评排序", value: "B" },
    { text: "销量排序", value: "C" },
  ];
</script>
<template>
  <div class="SearchCategories">
    <div
      class="searchInput"
      :class="[theme == 'dark' ? 'bg-black' : 'bg-white']">
      <form action="/">
        <van-search
          v-model="keyWord"
          placeholder="请输入作者名/作品名/类型"
          background="transparent"
          autocomplete="off"
          :class="[theme == 'dark' ? 'searchDark' : 'searchLight']" />
      </form>
    </div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
    </van-dropdown-menu>
  </div>
</template>
<style lang="scss">
  .searchDark {
    --van-search-content-background: transparent;
    --van-field-input-text-color: rgb(254, 254, 254);
  }
  .searchLight {
    --van-search-content-background: transparent;
    --van-field-input-text-color: rgb(1, 1, 1);
  }
</style>

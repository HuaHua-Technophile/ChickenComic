<script setup lang="ts">
  import { ref } from "vue";
  const value1 = ref(0);
  const value2 = ref("a");
  const option1 = [
    { text: "全部商品", value: 0 },
    { text: "新款商品", value: 1 },
    { text: "活动商品", value: 2 },
  ];
  const option2 = [
    { text: "默认排序", value: "a" },
    { text: "好评排序", value: "b" },
    { text: "销量排序", value: "c" },
  ];
</script>
<template>
  <div class="SearchCategories">
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
  </div>
</template>
